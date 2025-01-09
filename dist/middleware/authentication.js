import jwt from 'jsonwebtoken';
import passport from 'passport';
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
};
export default authentication;
