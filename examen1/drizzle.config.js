"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: './src/database/migrations',
    schema: './src/database/schemas/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
