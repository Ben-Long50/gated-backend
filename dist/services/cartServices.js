import prisma from '../config/database.js';
const cartServices = {
    editCartWeapon: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartWeaponRelation.findUnique({
                where: {
                    characterCartId_weaponId: {
                        characterCartId: cartId,
                        weaponId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartWeaponRelation.delete({
                        where: {
                            characterCartId_weaponId: {
                                characterCartId: cartId,
                                weaponId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartWeaponRelation.update({
                        where: {
                            characterCartId_weaponId: {
                                characterCartId: cartId,
                                weaponId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        weapons: {
                            create: { weapon: { connect: { id: itemId } }, quantity: value },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartArmor: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartArmorRelation.findUnique({
                where: {
                    characterCartId_armorId: {
                        characterCartId: cartId,
                        armorId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartArmorRelation.delete({
                        where: {
                            characterCartId_armorId: {
                                characterCartId: cartId,
                                armorId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartArmorRelation.update({
                        where: {
                            characterCartId_armorId: {
                                characterCartId: cartId,
                                armorId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        armor: {
                            create: { armor: { connect: { id: itemId } }, quantity: value },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartCybernetic: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartCyberneticRelation.findUnique({
                where: {
                    characterCartId_cyberneticId: {
                        characterCartId: cartId,
                        cyberneticId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartCyberneticRelation.delete({
                        where: {
                            characterCartId_cyberneticId: {
                                characterCartId: cartId,
                                cyberneticId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartCyberneticRelation.update({
                        where: {
                            characterCartId_cyberneticId: {
                                characterCartId: cartId,
                                cyberneticId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        cybernetics: {
                            create: {
                                cybernetic: { connect: { id: itemId } },
                                quantity: value,
                            },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartVehicle: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartVehicleRelation.findUnique({
                where: {
                    characterCartId_vehicleId: {
                        characterCartId: cartId,
                        vehicleId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartVehicleRelation.delete({
                        where: {
                            characterCartId_vehicleId: {
                                characterCartId: cartId,
                                vehicleId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartVehicleRelation.update({
                        where: {
                            characterCartId_vehicleId: {
                                characterCartId: cartId,
                                vehicleId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        vehicles: {
                            create: { vehicle: { connect: { id: itemId } }, quantity: value },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartDrone: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartDroneRelation.findUnique({
                where: {
                    characterCartId_droneId: {
                        characterCartId: cartId,
                        droneId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartDroneRelation.delete({
                        where: {
                            characterCartId_droneId: {
                                characterCartId: cartId,
                                droneId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartDroneRelation.update({
                        where: {
                            characterCartId_droneId: {
                                characterCartId: cartId,
                                droneId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        drones: {
                            create: { drone: { connect: { id: itemId } }, quantity: value },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartModification: async (cartId, itemId, value) => {
        try {
            const cartItem = await prisma.cartModificationRelation.findUnique({
                where: {
                    characterCartId_modificationId: {
                        characterCartId: cartId,
                        modificationId: itemId,
                    },
                },
            });
            if (cartItem) {
                if (cartItem.quantity + value <= 0) {
                    await prisma.cartModificationRelation.delete({
                        where: {
                            characterCartId_modificationId: {
                                characterCartId: cartId,
                                modificationId: itemId,
                            },
                        },
                    });
                }
                else {
                    await prisma.cartModificationRelation.update({
                        where: {
                            characterCartId_modificationId: {
                                characterCartId: cartId,
                                modificationId: itemId,
                            },
                        },
                        data: { quantity: cartItem.quantity + value },
                    });
                }
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        modifications: {
                            create: {
                                modification: { connect: { id: itemId } },
                                quantity: value,
                            },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    editCartItem: async (cartId, itemId, value) => {
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
                }
                else {
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
            }
            else {
                await prisma.characterCart.update({
                    where: { id: cartId },
                    data: {
                        items: {
                            create: { item: { connect: { id: itemId } }, quantity: value },
                        },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
};
export default cartServices;
