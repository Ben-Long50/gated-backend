import prisma from '../config/database.js';
import { Character } from '../types/character.js';
import {
  includeCharacterCart,
  includeCharacterInventory,
  unequipLinked,
} from '../utils/linkQueryStructures.js';
import { ItemType } from '@prisma/client';
import itemServices from './itemServices.js';

const characterServices = {
  getCharacters: async (userId: number) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId,
        },
        select: { id: true },
      });

      if (characters.length === 0) {
        throw new Error('You have not created any characters');
      }

      return characters;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch characters');
    }
  },

  getActiveCharacter: async (userId: number) => {
    try {
      const activeCharacter = await prisma.character.findFirst({
        where: {
          userId,
          active: true,
        },
        include: {
          campaign: {
            select: {
              name: true,
              characters: true,
              gangs: true,
              factions: true,
              ownerId: true,
            },
          },
          conditions: {
            include: { condition: true },
            orderBy: { condition: { name: 'asc' } },
          },
          affiliations: { include: { factions: true, characters: true } },
          perks: true,
          characterCart: {
            include: includeCharacterCart,
          },
          characterInventory: {
            include: includeCharacterInventory,
          },
        },
      });

      return activeCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find active character');
    }
  },

  getCharacterById: async (characterId: string) => {
    try {
      const character = await prisma.character.findUnique({
        where: {
          id: Number(characterId),
        },
        include: {
          campaign: {
            select: {
              name: true,
              ownerId: true,
            },
          },
          conditions: {
            include: { condition: true },
            orderBy: { condition: { name: 'asc' } },
          },
          perks: true,
          characterInventory: {
            include: includeCharacterInventory,
          },
          characterCart: {
            include: includeCharacterCart,
          },
        },
      });

      return character;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch character');
    }
  },

  setActiveCharacter: async (userId: number, characterId: string) => {
    try {
      await prisma.character.updateMany({
        where: { id: { not: Number(characterId) }, userId },
        data: { active: false },
      });
      const activeCharacter = await prisma.character.update({
        where: { id: Number(characterId), userId },
        data: { active: true },
      });

      return activeCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to switch active character');
    }
  },

  toggleEquipment: async (
    inventoryId: string,
    itemId: string,
    category: ItemType[],
  ) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
          itemTypes: { hasSome: category },
          characterInventoryId: Number(inventoryId),
        },
        select: { id: true, equipped: true },
      });

      if (!item) {
        throw new Error('Item not found');
      }

      await prisma.item.update({
        where: { id: item.id },
        data: { equipped: item.equipped ? false : true },
      });

      await prisma.$transaction([
        prisma.itemLinkReference.update({
          where: { itemId: item.id },
          data: item.equipped
            ? unequipLinked
            : {
                items: {
                  updateMany: {
                    where: {},
                    data: {
                      equipped: true,
                    },
                  },
                },
                actions: {
                  updateMany: {
                    where: { actionType: 'passive' },
                    data: {
                      active: true,
                      equipped: true,
                    },
                  },
                },
              },
        }),
        prisma.itemLinkReference.update({
          where: { itemId: item.id },
          data: item.equipped
            ? unequipLinked
            : {
                actions: {
                  updateMany: {
                    where: { actionType: { not: 'passive' } },
                    data: {
                      equipped: true,
                    },
                  },
                },
              },
        }),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to toggle equipment');
    }
  },

  createCharacter: async (formData: Character, userId: number) => {
    try {
      const data = {
        ...formData,
        userId,
        stats: {
          currentHealth: formData.stats?.currentHealth,
          currentSanity: formData.stats?.currentSanity,
          injuries: 0,
          insanities: 0,
        },
        perks: {
          connect: formData.perks?.map((id: number) => ({ id })) || [],
        },
      };

      const newCharacter = await prisma.character.create({
        data,
      });

      await characterServices.createCharacterCart(newCharacter.id);
      await characterServices.createCharacterInventory(newCharacter.id);

      return newCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character');
    }
  },

  createCharacterCart: async (characterId: number) => {
    try {
      await prisma.characterCart.create({
        data: {
          character: { connect: { id: characterId } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character cart');
    }
  },

  createCharacterInventory: async (characterId: number) => {
    try {
      await prisma.characterInventory.create({
        data: {
          character: { connect: { id: characterId } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character inventory');
    }
  },

  addToInventory: async (
    userId: number,
    characterId: number,
    inventoryId: number,
  ) => {
    try {
      const profits =
        (
          await prisma.character.findUnique({
            where: { id: characterId },
            select: { profits: true },
          })
        )?.profits || 0;

      const cart = await prisma.characterCart.findUnique({
        where: { characterId },
        select: {
          items: {
            include: {
              item: { select: { id: true, price: true, itemTypes: true } },
            },
          },
        },
      });

      const items =
        cart?.items.map((item) => ({
          itemId: item.item.id,
          quantity: item.quantity,
          price: item.item.price,
        })) || [];

      const totalPrice = cart?.items
        .flat()
        .map((reference) => {
          const targetObject = Object.values(reference).find(
            (item) => typeof item === 'object',
          );
          return targetObject?.price
            ? reference.quantity * targetObject.price
            : 0;
        })
        .reduce((sum, item) => sum + item, 0);

      if (typeof totalPrice !== 'number') {
        throw new Error('Failed to calculate total cart price');
      }

      if (totalPrice > profits) {
        throw new Error(
          'You do not have enough profits to complete this purchase',
        );
      }

      if (items.length > 0) {
        itemServices.createCharacterItemCopy(userId, inventoryId, items);
      }

      await prisma.character.update({
        where: { id: Number(characterId) },
        data: { profits: profits - totalPrice },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add items to inventory');
    }
  },

  clearCart: async (characterId: number) => {
    try {
      await prisma.characterCart.update({
        where: { characterId: Number(characterId) },
        data: {
          items: {
            deleteMany: {},
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to clear cart');
    }
  },

  updateCharacter: async (
    formData: Partial<Character>,
    userId: number,
    characterId: number,
  ) => {
    try {
      const data = {
        ...formData,
      };

      if (formData.perks) {
        //@ts-ignore
        data.perks = { set: formData.perks.map((perk) => ({ id: perk })) };
      }

      const updatedCharacter = await prisma.character.update({
        where: {
          userId,
          id: Number(characterId),
        },
        //@ts-ignore
        data,
      });

      return updatedCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update character');
    }
  },

  createCharacterConditions: async (
    userId: number,
    characterId: number,
    formData: { conditionId: number; stacks?: number | null }[],
  ) => {
    try {
      const character = await prisma.character.findUnique({
        where: { id: characterId, userId },
        include: {
          conditions: { select: { id: true } },
        },
      });

      if (!character) {
        throw new Error('Failed to find character');
      }

      if (character && character.conditions) {
        await prisma.characterConditionReference.deleteMany({
          where: {
            id: { in: character.conditions.map((condition) => condition.id) },
          },
        });
      }

      const conditionData =
        formData?.map((condition) => ({
          conditionId: condition.conditionId,
          stacks: condition.stacks ? condition.stacks : null,
        })) || [];

      await prisma.character.update({
        where: {
          userId: userId,
          id: characterId,
        },
        data: {
          conditions: { createMany: { data: conditionData } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character conditions');
    }
  },

  deleteCharacter: async (userId: number, characterId: string) => {
    try {
      await prisma.character.delete({
        where: {
          userId: userId,
          id: Number(characterId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete character');
    }
  },
};

export default characterServices;
