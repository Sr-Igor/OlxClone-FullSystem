import { checkSchema } from "express-validator";

export const AuthValidator = {
    singUp: checkSchema({
        name: {
            trim: true, 
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "This field must be at least 2 characters long"
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Invalid E-mail"
        }, 
        password: {
            isLength: {
                options: { min: 8 }
            },
            errorMessage: "Invalid Passowrd"
        },
        state: {
            notEmpty: true,
            errorMessage: "Invalid State"
        }
    }),
    signIn: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Invalid E-mail"
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Invalid Password"
        }
    })
}