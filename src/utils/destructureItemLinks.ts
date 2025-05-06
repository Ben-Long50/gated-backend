import { CharacterInventory, Prisma } from '@prisma/client';

type WeaponWithLink = Prisma.WeaponGetPayload<{
  include: {
    weaponLinkReference: {
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    };
  };
}>;

type ArmorWithLink = Prisma.ArmorGetPayload<{
  include: {
    armorLinkReference: {
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    };
  };
}>;

type CyberneticWithLink = Prisma.CyberneticGetPayload<{
  include: {
    cyberneticLinkReference: {
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    };
  };
}>;

type VehicleWithLink = Prisma.VehicleGetPayload<{
  include: {
    vehicleLinkReference: {
      include: {
        weapons: true;
        armors: true;
        modifications: true;
        actions: true;
      };
    };
  };
}>;

type DroneWithLink = Prisma.DroneGetPayload<{
  include: {
    droneLinkReference: {
      include: {
        weapons: true;
        modifications: true;
        actions: true;
      };
    };
  };
}>;

type ModificationWithLink = Prisma.ModificationGetPayload<{
  include: {
    modificationLinkReference: {
      include: { actions: true };
    };
  };
}>;

type ItemWithLink = Prisma.ItemGetPayload<{
  include: {
    itemLinkReference: {
      include: { actions: true };
    };
  };
}>;

type ItemWithLinkReference =
  | WeaponWithLink
  | ArmorWithLink
  | CyberneticWithLink
  | VehicleWithLink
  | DroneWithLink
  | ModificationWithLink
  | ItemWithLink;

export const destructureLinkReference = (item: ItemWithLinkReference) => {
  if ('weaponLinkReference' in item) {
    const { weaponLinkReference, ...weaponData } = { ...item };

    return {
      weapons: weaponLinkReference?.weapons,
      armor: weaponLinkReference?.armors,
      cybernetics: weaponLinkReference?.cybernetics,
      actions: weaponLinkReference?.actions,
      ...weaponData,
    };
  } else if ('armorLinkReference' in item) {
    const { armorLinkReference, ...weaponData } = { ...item };

    return {
      weapons: armorLinkReference?.weapons,
      armor: armorLinkReference?.armors,
      cybernetics: armorLinkReference?.cybernetics,
      actions: armorLinkReference?.actions,
      ...weaponData,
    };
  } else if ('cyberneticLinkReference' in item) {
    const { cyberneticLinkReference, ...cyberneticData } = { ...item };

    return {
      weapons: cyberneticLinkReference?.weapons,
      armor: cyberneticLinkReference?.armors,
      cybernetics: cyberneticLinkReference?.cybernetics,
      actions: cyberneticLinkReference?.actions,
      ...cyberneticData,
    };
  } else if ('vehicleLinkReference' in item) {
    const { vehicleLinkReference, ...vehicleData } = { ...item };

    return {
      weapons: vehicleLinkReference?.weapons,
      armor: vehicleLinkReference?.armors,
      modifications: vehicleLinkReference?.modifications,
      actions: vehicleLinkReference?.actions,
      ...vehicleData,
    };
  } else if ('droneLinkReference' in item) {
    const { droneLinkReference, ...droneData } = { ...item };

    return {
      weapons: droneLinkReference?.weapons,
      modifications: droneLinkReference?.modifications,
      actions: droneLinkReference?.actions,
      ...droneData,
    };
  } else if ('modificationLinkReference' in item) {
    const { modificationLinkReference, ...modificationData } = { ...item };

    return {
      actions: modificationLinkReference?.actions,
      ...modificationData,
    };
  } else if ('itemLinkReference' in item) {
    const { itemLinkReference, ...itemData } = { ...item };

    return {
      actions: itemLinkReference?.actions,
      ...itemData,
    };
  }
  return;
};

export const destructureInventory = (inventory: CharacterInventory) => {
  const destructuredInventory = Object.fromEntries(
    Object.entries(inventory).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.map((item) => destructureLinkReference(item))];
      } else {
        return [key, value];
      }
    }),
  );

  return destructuredInventory;
};
