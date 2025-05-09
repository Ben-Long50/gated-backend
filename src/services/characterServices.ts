import prisma from '../config/database.js';
import { Character } from '../types/character.js';
import {
  equipLinked,
  includeCharacterInventory,
  unequipLinked,
} from '../utils/linkQueryStructures.js';
import weaponServices from './weaponServices.js';
import armorServices from './armorServices.js';
import cyberneticServices from './cyberneticServices.js';
import vehicleServices from './vehicleServices.js';
import itemServices from './itemServices.js';
import modificationServices from './modificationServices.js';
import { destructureInventory } from '../utils/destructureItemLinks.js';
import droneServices from './droneServices.js';

const characterServices = {
  getCharacters: async (userId: number) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId,
        },
        include: {
          perks: { include: { modifiers: { include: { action: true } } } },
          characterInventory: {
            include: includeCharacterInventory,
          },
        },
        orderBy: [{ active: 'desc' }, { level: 'desc' }],
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
            select: { characters: true, gangs: true, factions: true },
          },
          affiliations: { include: { factions: true, characters: true } },
          perks: { include: { modifiers: { include: { action: true } } } },
          characterCart: {
            include: {
              weapons: {
                include: { weapon: true },
                orderBy: { weapon: { name: 'asc' } },
              },
              armor: {
                include: { armor: true },
                orderBy: { armor: { name: 'asc' } },
              },
              cybernetics: {
                include: { cybernetic: true },
                orderBy: { cybernetic: { name: 'asc' } },
              },
              vehicles: {
                include: { vehicle: true },
                orderBy: { vehicle: { name: 'asc' } },
              },
              modifications: {
                include: { modification: true },
                orderBy: { modification: { name: 'asc' } },
              },
              items: {
                include: { item: true },
                orderBy: { item: { name: 'asc' } },
              },
              drones: {
                include: { drone: true },
                orderBy: { drone: { name: 'asc' } },
              },
            },
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
          campaign: { select: { name: true, id: true } },
          perks: { include: { modifiers: { include: { action: true } } } },
          characterInventory: {
            include: includeCharacterInventory,
          },
        },
      });

      const charaterData = {
        ...character,
        characterInventory: character?.characterInventory
          ? destructureInventory(character.characterInventory)
          : null,
      };

      return charaterData;
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
    category: string,
  ) => {
    try {
      const categories = [
        'weapon',
        'armor',
        'cybernetic',
        'item',
        'vehicle',
        'drone',
      ];

      if (!categories.includes(category)) {
        throw new Error(`Invalid category: ${category}`);
      }

      const item =
        // @ts-ignore
        await prisma[category].findUnique({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          select: { id: true, equipped: true },
        });

      if (!item) {
        throw new Error('Item not found');
      }

      if (category === 'cybernetic') {
        await prisma.cybernetic.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });

        await prisma.cyberneticLinkReference.update({
          where: { cyberneticId: item.id },
          data: item.equipped ? unequipLinked : equipLinked,
        });
      }

      if (category === 'weapon') {
        await prisma.weapon.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });

        await prisma.weaponLinkReference.update({
          where: { weaponId: item.id },
          data: item.equipped ? unequipLinked : equipLinked,
        });
      }

      if (category === 'armor') {
        await prisma.armor.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });

        await prisma.armorLinkReference.update({
          where: { armorId: item.id },
          data: item.equipped ? unequipLinked : equipLinked,
        });
      }

      if (category === 'item') {
        await prisma.item.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });
      }

      if (category === 'vehicle') {
        await prisma.vehicle.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });
      }

      if (category === 'drone') {
        await prisma.drone.update({
          where: {
            id: Number(itemId),
            characterInventoryId: Number(inventoryId),
          },
          data: {
            equipped: !item.equipped,
          },
        });
      }
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

  addToInventory: async (characterId: number, inventoryId: number) => {
    try {
      const profits =
        (
          await prisma.character.findUnique({
            where: { id: Number(characterId) },
            select: { profits: true },
          })
        )?.profits || 0;

      const cart = await prisma.characterCart.findUnique({
        where: { characterId },
        select: {
          weapons: {
            include: { weapon: { select: { id: true, price: true } } },
          },
          armor: { include: { armor: { select: { id: true, price: true } } } },
          cybernetics: {
            include: { cybernetic: { select: { id: true, price: true } } },
          },
          vehicles: {
            include: { vehicle: { select: { id: true, price: true } } },
          },
          drones: { include: { drone: { select: { id: true, price: true } } } },
          modifications: {
            include: { modification: { select: { id: true, price: true } } },
          },
          items: { include: { item: { select: { id: true, price: true } } } },
        },
      });

      const weapons =
        cart?.weapons.map((weapon) => ({
          weaponId: weapon.weapon.id,
          quantity: weapon.quantity,
          price: weapon.weapon.price,
        })) || [];

      const armor =
        cart?.armor.map((armor) => ({
          armorId: armor.armor.id,
          quantity: armor.quantity,
          price: armor.armor.price,
        })) || [];

      const cybernetics =
        cart?.cybernetics.map((cybernetic) => ({
          cyberneticId: cybernetic.cybernetic.id,
          quantity: cybernetic.quantity,
          price: cybernetic.cybernetic.price,
        })) || [];

      const vehicles =
        cart?.vehicles.map((vehicle) => ({
          vehicleId: vehicle.vehicle.id,
          quantity: vehicle.quantity,
          price: vehicle.vehicle.price,
        })) || [];

      const drones =
        cart?.drones.map((drone) => ({
          droneId: drone.drone.id,
          quantity: drone.quantity,
          price: drone.drone.price,
        })) || [];

      const modifications =
        cart?.modifications.map((modification) => ({
          modificationId: modification.modification.id,
          quantity: modification.quantity,
          price: modification.modification.price,
        })) || [];

      const items =
        cart?.items.map((item) => ({
          itemId: item.item.id,
          quantity: item.quantity,
          price: item.item.price,
        })) || [];

      // @ts-ignore
      const totalPrice = Object.values(cart)
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

      if (totalPrice > profits) {
        throw new Error(
          'You do not have enough profits to complete this purchase',
        );
      }

      if (weapons.length > 0) {
        weaponServices.createCharacterWeaponCopy(inventoryId, weapons);
      }
      if (armor.length > 0) {
        armorServices.createCharacterArmorCopy(inventoryId, armor);
      }
      if (cybernetics.length > 0) {
        cyberneticServices.createCharacterCyberneticCopy(
          inventoryId,
          cybernetics,
        );
      }
      if (vehicles.length > 0) {
        vehicleServices.createCharacterVehicleCopy(inventoryId, vehicles);
      }
      if (drones.length > 0) {
        droneServices.createCharacterDroneCopy(inventoryId, drones);
      }
      if (modifications.length > 0) {
        modificationServices.createCharacterModificationCopy(
          inventoryId,
          modifications,
        );
      }
      if (items.length > 0) {
        itemServices.createCharacterItemCopy(inventoryId, items);
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
          weapons: {
            deleteMany: {},
          },
          armor: {
            deleteMany: {},
          },
          cybernetics: {
            deleteMany: {},
          },
          vehicles: {
            deleteMany: {},
          },
          drones: {
            deleteMany: {},
          },
          modifications: {
            deleteMany: {},
          },
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
    formData: Character,
    userId: number,
    characterId: number,
  ) => {
    try {
      const { perks, stats, ...data } = {
        ...formData,
      };

      const updatedCharacter = await prisma.character.update({
        where: {
          userId,
          id: Number(characterId),
        },
        data: {
          ...data,
          stats: {
            ...stats,
          },
          perks: { set: perks?.map((id: number) => ({ id })) || [] },
        },
      });

      return updatedCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update character');
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
