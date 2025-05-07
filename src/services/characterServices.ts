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
import {
  destructureInventory,
  destructureLinkReference,
} from '../utils/destructureItemLinks.js';
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
              weapons: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              armor: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              cybernetics: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              vehicles: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              items: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
              drones: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
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
        characterInventory:
          destructureInventory(character?.characterInventory) || null,
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

  editCart: async (
    characterId: string,
    cartId: string,
    category: string,
    itemId: string,
  ) => {
    try {
      const categories = [
        'weapons',
        'armor',
        'cybernetics',
        'vehicles',
        'modifications',
        'items',
        'drones',
      ];

      if (!categories.includes(category)) {
        throw new Error(`Invalid category: ${category}`);
      }

      const cart = await prisma.characterCart.findUnique({
        where: { id: Number(cartId), characterId: Number(characterId) },
        select: { [category]: { select: { id: true } } },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemExists = cart[category].some(
        (item: { id: number }) => item.id === Number(itemId),
      );

      const data = itemExists
        ? { [category]: { disconnect: { id: Number(itemId) } } }
        : { [category]: { connect: { id: Number(itemId) } } };

      await prisma.characterCart.update({
        where: { id: Number(cartId) },
        data,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add item to cart');
    }
  },

  addToInventory: async (
    characterId: string,
    inventoryId: string,
    formData: {
      weapons: { weaponId: number; price: number; quantity: number }[];
      armor: { armorId: number; price: number; quantity: number }[];
      cybernetics: { cyberneticId: number; price: number; quantity: number }[];
      vehicles: { vehicleId: number; price: number; quantity: number }[];
      modifications: {
        modificationId: number;
        price: number;
        quantity: number;
      }[];
      items: { itemId: number; price: number; quantity: number }[];
      drones: { droneId: number; price: number; quantity: number }[];
    },
  ) => {
    try {
      const profits =
        (
          await prisma.character.findUnique({
            where: { id: Number(characterId) },
            select: { profits: true },
          })
        )?.profits || 0;

      const totalPrice = Object.values(formData)
        .flatMap((category) =>
          category.map((item) => item.price * item.quantity),
        )
        .reduce((sum, price) => sum + price, 0);

      if (totalPrice > profits) {
        throw new Error(
          'You do not have enough profits to complete this purchase',
        );
      }

      if (formData.weapons.length > 0) {
        weaponServices.createCharacterWeaponCopy(inventoryId, formData.weapons);
      }
      if (formData.armor.length > 0) {
        armorServices.createCharacterArmorCopy(inventoryId, formData.armor);
      }
      if (formData.cybernetics.length > 0) {
        cyberneticServices.createCharacterCyberneticCopy(
          inventoryId,
          formData.cybernetics,
        );
      }
      if (formData.vehicles.length > 0) {
        vehicleServices.createCharacterVehicleCopy(
          inventoryId,
          formData.vehicles,
        );
      }
      if (formData.drones.length > 0) {
        droneServices.createCharacterDroneCopy(inventoryId, formData.drones);
      }
      if (formData.modifications.length > 0) {
        modificationServices.createCharacterModificationCopy(
          inventoryId,
          formData.modifications,
        );
      }
      if (formData.items.length > 0) {
        itemServices.createCharacterItemCopy(inventoryId, formData.items);
      }

      await prisma.character.update({
        where: { id: Number(characterId) },
        data: { profits: profits - totalPrice },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to items to inventory');
    }
  },

  clearCart: async (characterId: string) => {
    try {
      await prisma.characterCart.update({
        where: { characterId: Number(characterId) },
        data: {
          weapons: {
            set: [],
          },
          armor: {
            set: [],
          },
          cybernetics: {
            set: [],
          },
          vehicles: {
            set: [],
          },
          modifications: {
            set: [],
          },
          items: {
            set: [],
          },
          drones: {
            set: [],
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
