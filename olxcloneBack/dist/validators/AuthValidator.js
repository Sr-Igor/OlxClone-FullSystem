"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const express_validator_1 = require("express-validator");
exports.AuthValidator = {
    singUp: (0, express_validator_1.checkSchema)({
        name: {
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Nome precisa ter pelo menos 2 caracteres"
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail inválido"
        },
        password: {
            isLength: {
                options: { min: 8 }
            },
            errorMessage: "Senha deve conter pelo menos 8 caracteres"
        },
        state: {
            notEmpty: true,
            errorMessage: "Estado inválido"
        }
    }),
    signIn: (0, express_validator_1.checkSchema)({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail inválido"
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Senha inválida"
        }
    })
};
