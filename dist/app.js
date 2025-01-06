import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import perkRouter from './routes/perkRoutes.js';
import characterRouter from './routes/characterRoutes.js';
import keywordRouter from './routes/keywordRoutes.js';
import weaponRouter from './routes/weaponRoutes.js';
import armorRouter from './routes/armorRoutes.js';
import actionRouter from './routes/actionRoutes.js';
import cybernericRouter from './routes/cyberneticRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import './passport/passport.js';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 100,
});
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.MOBILE_CLIENT,
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(limiter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', perkRouter);
app.use('/', characterRouter);
app.use('/', keywordRouter);
app.use('/', weaponRouter);
app.use('/', armorRouter);
app.use('/', actionRouter);
app.use('/', cybernericRouter);
app.use('/', bookRouter);
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError(404));
});
// error handler
app.use((err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    // Send JSON error response
    res.status(500).json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});
export default app;
