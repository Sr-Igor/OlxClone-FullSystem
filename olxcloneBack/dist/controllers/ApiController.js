"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const ping = (req, res) => {
    res.status(200);
    res.json({ pong: true });
};
exports.ping = ping;
