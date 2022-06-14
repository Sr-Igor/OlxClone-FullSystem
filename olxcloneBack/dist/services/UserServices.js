"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStates = exports.findStateId = exports.singInUser = exports.createUser = exports.updateUser = exports.findUserEmail = void 0;
const User = require("../models/user");
const State = require("../models/state");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = require("../config/passport");
const mongoose_1 = __importDefault(require("mongoose"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const findUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findOne({ email });
});
exports.findUserEmail = findUserEmail;
const updateUser = (token, data, req) => __awaiter(void 0, void 0, void 0, function* () {
    let updates = {};
    if (data.name) {
        updates.name = data.name;
    }
    if (data.email) {
        const existentEmail = yield User.findOne({ email: data.email });
        if (existentEmail) {
            return new Error("E-mail já registrado");
        }
        else {
            updates.email = data.email;
        }
    }
    if (data.state) {
        if (mongoose_1.default.Types.ObjectId.isValid(data.state)) {
            const existentState = yield State.findById(data.state);
            if (!existentState) {
                return new Error("Estado inválido");
            }
            updates.state = data.state;
        }
        else {
            return new Error("Código de estado inválido");
        }
    }
    if (data.newPassword && data.password) {
        const userToken = yield User.findOne({ token });
        const match = yield bcrypt_1.default.compare(data.password, userToken.passwordHash);
        if (match) {
            let passwordHash = yield bcrypt_1.default.hash(data.newPassword, 10);
            updates.passwordHash = passwordHash;
        }
        else {
            return new Error("Senha atual incorreta");
        }
    }
    let image;
    if (req.file) {
        let file = req.file;
        image = file.filename;
        updates.image = image;
        yield (0, sharp_1.default)(file.path)
            .resize(500, 500)
            .toFormat("jpeg")
            .toFile(`./public/media/${file.filename}.jpg`);
        (0, fs_1.unlink)(file.path, (err) => {
            if (err)
                throw err;
        });
    }
    if (data.delProfileImage) {
        let user = yield User.findOne({ token });
        (0, fs_1.unlink)(`./public/media/${user.image}.jpg`, (err) => {
            if (err)
                throw err;
        });
        updates.image = "";
    }
    let userImageProfile = (image) ? `${process.env.BASE}/media/${image}.jpg` : null;
    yield User.findOneAndUpdate({ token }, { $set: updates });
    return userImageProfile;
});
exports.updateUser = updateUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify existent user
    const user = yield User.findOne({ email: data.email });
    if (user) {
        return new Error("E-mail já registrado");
    }
    // Verify available State
    const stateItem = yield State.findById(data.state);
    if (mongoose_1.default.Types.ObjectId.isValid(data.state) && data.state) {
        if (!stateItem) {
            return new Error("Estado inválido");
        }
    }
    else {
        return new Error("Código de estado inválido");
    }
    // Crypt password
    const passwordHash = yield bcrypt_1.default.hash(data.password, 10);
    // Generate Token
    const token = (0, passport_1.generateToken)(data);
    // Create User
    const newUser = yield new User({
        name: data.name,
        email: data.email,
        passwordHash,
        token,
        state: data.state
    });
    yield newUser.save();
    return token;
});
exports.createUser = createUser;
const singInUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify User for Email
    const user = yield User.findOne({ email: data.email });
    if (!user) {
        return new Error("E-mail e/ou senha incorreto(s)");
    }
    // Verify User for password
    const match = yield bcrypt_1.default.compare(data.password, user.passwordHash);
    if (!match) {
        return new Error("E-mail e/ou senha incorreto(s)");
    }
    //Generate Token 
    const token = (0, passport_1.generateToken)(data);
    // Save new Token
    user.token = token;
    yield user.save();
    return token;
});
exports.singInUser = singInUser;
const findStateId = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const completState = yield State.findById(state);
    return (completState) ? completState.name : "";
});
exports.findStateId = findStateId;
const findAllStates = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield State.find();
});
exports.findAllStates = findAllStates;
