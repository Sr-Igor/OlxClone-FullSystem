import { checkSchema } from "express-validator";

export const UserValidator = {
    editUser: checkSchema({
        name: {
            optional: true,
            trim: true, 
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "This field must be at least 2 characters long"
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Invalid E-mail"
        }, 
        password: {
            optional: true,
            notEmpty: true,
            errorMessage: "Invalid Passowrd"
        },
        newPassword: {
            optional: true,
            isLength: {
                options: { min: 8 }
            },
            errorMessage: "Invalid Passowrd"
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: "Invalid State"
        },
        delProfileImage: {
            optional: true,
        }, 
    }),
}