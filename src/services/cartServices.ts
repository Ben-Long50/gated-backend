import prisma from '../config/database.js';

const cartServices = {
  editCartItem: async (cartId: number, itemId: number, value: number) => {
    try {
      const cartItem = await prisma.cartItemRelation.findUnique({
        where: {
          characterCartId_itemId: {
            characterCartId: cartId,
            itemId: itemId,
          },
        },
      });

      if (cartItem) {
        if (cartItem.quantity + value <= 0) {
          await prisma.cartItemRelation.delete({
            where: {
              characterCartId_itemId: {
                characterCartId: cartId,
                itemId: itemId,
              },
            },
          });
        } else {
          await prisma.cartItemRelation.update({
            where: {
              characterCartId_itemId: {
                characterCartId: cartId,
                itemId: itemId,
              },
            },
            data: { quantity: cartItem.quantity + value },
          });
        }
      } else {
        await prisma.characterCart.update({
          where: { id: cartId },
          data: {
            items: {
              create: { item: { connect: { id: itemId } }, quantity: value },
            },
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add item to cart');
    }
  },
};

export default cartServices;
