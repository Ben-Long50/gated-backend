import prisma from '../config/database';
import characterServices from '../services/characterServices';

const getCharIds = async () => {
  return await prisma.character.findMany({
    where: { characterInventory: null },
    select: { id: true },
  });
};

let ids = await getCharIds().then((result) => result.map((item) => item.id));

const cartPromises = ids.map((id) => {
  return characterServices.createCharacterCart(id);
});

await Promise.all(cartPromises);

const invPromises = ids.map((id) => {
  return characterServices.createCharacterInventory(id);
});

await Promise.all(invPromises);
