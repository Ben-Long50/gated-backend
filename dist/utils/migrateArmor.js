"use strict";
// import prisma from '../config/database';
// async function migrateCyberneticRelationships() {
//   // Migrate Armor
//   const armors = await prisma.armor.findMany({
//     include: {
//       cybernetic: true, // Fetch related cybernetics
//     },
//   });
//   const armorUpdates = armors.map((armor) => {
//     const cyberneticId = armor.cybernetic[0]?.id; // Assuming only one cybernetic is associated
//     if (cyberneticId) {
//       return prisma.armor.update({
//         where: { id: armor.id },
//         data: { cyberneticId },
//       });
//     }
//     return Promise.resolve(); // Skip if no cybernetic is associated
//   });
//   console.log('Armor migration prepared.');
//   // Migrate Weapon
//   const weapons = await prisma.weapon.findMany({
//     include: {
//       cybernetic: true, // Fetch related cybernetics
//     },
//   });
//   const weaponUpdates = weapons.map((weapon) => {
//     const cyberneticId = weapon.cybernetic[0]?.id; // Assuming only one cybernetic is associated
//     if (cyberneticId) {
//       return prisma.weapon.update({
//         where: { id: weapon.id },
//         data: { cyberneticId },
//       });
//     }
//     return Promise.resolve(); // Skip if no cybernetic is associated
//   });
//   console.log('Weapon migration prepared.');
//   // Migrate Action
//   const actions = await prisma.action.findMany({
//     include: {
//       cybernetic: true, // Fetch related cybernetics
//     },
//   });
//   const actionUpdates = actions.map((action) => {
//     const cyberneticId = action.cybernetic[0]?.id; // Assuming only one cybernetic is associated
//     if (cyberneticId) {
//       return prisma.action.update({
//         where: { id: action.id },
//         data: { cyberneticId },
//       });
//     }
//     return Promise.resolve(); // Skip if no cybernetic is associated
//   });
//   console.log('Action migration prepared.');
//   // Run all updates in parallel
//   await Promise.all([...armorUpdates, ...weaponUpdates, ...actionUpdates]);
//   console.log('Migration complete for Armor, Weapon, and Action!');
// }
// // Execute the migration
// migrateCyberneticRelationships()
//   .then(() => console.log('Migration script finished successfully!'))
//   .catch((error) => console.error('Error migrating:', error));
