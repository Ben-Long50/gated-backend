import { Prisma } from '@prisma/client';

type LinkReferencePlaylaod = Prisma.ItemLinkReferenceGetPayload<{
  include: {
    items: true;
    actions: true;
  };
}> | null;
