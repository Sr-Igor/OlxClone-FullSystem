import { checkSchema } from "express-validator";

export const UserValidator = {
    editUser: checkSchema({
        name: {
            optional: true,
            trim: true, 
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Nome precisa ter pelo menos 2 caracteres"
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail Inválido"
        }, 
        password: {
            optional: true,
            notEmpty: true,
            errorMessage: "Senha Inválida"
        },
        newPassword: {
            optional: true,
            isLength: {
                options: { min: 8 }
            },
            errorMessage: "Nova senha deve conter pelo menos 8 caracteres"
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: "Estado inválido"
        },
        delProfileImage: {
            optional: true,
        }, 
    }),
}