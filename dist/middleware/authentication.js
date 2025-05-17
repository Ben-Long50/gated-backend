import jwt from 'jsonwebtoken';
import passport from 'passport';
import prisma from '../config/database.js';
const authentication = {
    issueJwt: (req, res, next) => {
        var _a;
        try {
            jwt.sign({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, process.env.JWT_SECRET, {
                expiresIn: '8h',
            }, (err, token) => {
                if (err) {
                    res.status(500).json({ message: 'Error generating token' });
                    return;
                }
                req.token = token;
                next();
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
                return;
            }
        }
    },
    authenticate: passport.authenticate('jwt', { session: false }),
    authenticateSuperadmin: (req, res, next) => {
        const allowedRoles = ['SUPERADMIN'];
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        else if (req.user.role && !allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: 'You do not have the required permissions to use this function',
            });
            return;
        }
        return next();
    },
    authenticateAdmin: (req, res, next) => {
        const allowedRoles = ['SUPERADMIN', 'ADMIN'];
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        else if (req.user.role && !allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: 'You do not have the required permissions to use this function',
            });
            return;
        }
        return next();
    },
    authenticateUser: (req, res, next) => {
        const allowedRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        else if (req.user.role && !allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: 'You do not have the required permissions to use this function',
            });
            return;
        }
        return next();
    },
    authenticateWeaponModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const weapon = await prisma.item.findUnique({
            where: { id: Number(req.params.weaponId), itemType: 'weapon' },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = weapon === null || weapon === void 0 ? void 0 : weapon.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this weapon',
            });
            return;
        }
        return next();
    },
    authenticateArmorModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const armor = await prisma.item.findUnique({
            where: { id: Number(req.params.armorId), itemType: 'armor' },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = armor === null || armor === void 0 ? void 0 : armor.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this armor',
            });
            return;
        }
        return next();
    },
    authenticateCyberneticModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const cybernetic = await prisma.item.findUnique({
            where: { id: Number(req.params.cyberneticId), itemType: 'cybernetic' },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this cybernetic',
            });
            return;
        }
        return next();
    },
    authenticateVehicleModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const vehicle = await prisma.item.findUnique({
            where: { id: Number(req.params.vehicleId), itemType: 'vehicle' },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = vehicle === null || vehicle === void 0 ? void 0 : vehicle.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this vehicle',
            });
            return;
        }
        return next();
    },
    authenticateDroneModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const drone = await prisma.item.findUnique({
            where: { id: Number(req.params.droneId), itemType: 'drone' },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = drone === null || drone === void 0 ? void 0 : drone.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this drone',
            });
            return;
        }
        return next();
    },
    authenticateItemModification: async (req, res, next) => {
        var _a, _b;
        if (!req.user) {
            res.status(401).json({ error: 'No user found' });
            return;
        }
        const item = await prisma.item.findUnique({
            where: { id: Number(req.params.itemId) },
            select: {
                characterInventory: {
                    select: {
                        character: { select: { userId: true } },
                    },
                },
            },
        });
        const userId = ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId) || null;
        if (req.user.id !== userId) {
            res.status(403).json({
                error: 'You do not have the required permissions to modify this item',
            });
            return;
        }
        return next();
    },
};
export default authentication;
