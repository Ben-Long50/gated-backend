import { Prisma } from '@prisma/client';

type LinkReferencePlaylaods =
  | Prisma.WeaponLinkReferenceGetPayload<{
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    }>
  | Prisma.ArmorLinkReferenceGetPayload<{
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    }>
  | Prisma.CyberneticLinkReferenceGetPayload<{
      include: {
        weapons: true;
        armors: true;
        cybernetics: true;
        actions: true;
      };
    }>
  | Prisma.VehicleLinkReferenceGetPayload<{
      include: {
        weapons: true;
        armors: true;
        modifications: true;
        actions: true;
      };
    }>
  | Prisma.ModificationLinkReferenceGetPayload<{
      include: {
        actions: true;
      };
    }>
  | Prisma.ItemLinkReferenceGetPayload<{
      include: {
        actions: true;
      };
    }>
  | null;
