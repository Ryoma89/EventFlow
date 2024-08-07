"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const stripeRoutes_1 = __importDefault(require("./routes/stripeRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is not defined');
}
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
app.use((0, cookie_parser_1.default)());
app.use('/api/stripe', stripeRoutes_1.default);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use('/api', authRoutes_1.default);
app.use('/api', userRoutes_1.default);
app.use('/api', eventRoutes_1.default);
app.use('/api', commentRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
