import prisma from '../config/database';
import characterServices from '../services/characterServices';
const getCharIds = async () => {
    return await prisma.character.findMany({
        select: { id: true },
    });
};
let ids = await getCharIds().then((result) => result.map((item) => item.id));
const cartPromises = ids.map((id) => {
    return characterServices.createCharacterCart(id);
});
Promise.all(cartPromises);
const invPromises = ids.map((id) => {
    return characterServices.createCharacterInventory(id);
});
Promise.all(invPromises);
console.log(cartPromises, invPromises);
