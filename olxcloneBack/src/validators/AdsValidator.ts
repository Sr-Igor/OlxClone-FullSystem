
import { checkSchema } from "express-validator";

export const AdsValidator = {
    addItem: checkSchema({
        state: {
            notEmpty: true,
            errorMessage: "Invalid State"
        },
        category: {
            notEmpty: true,
            errorMessage: "Invalid Category"
        },
        images: {
            optional: true
        },
        title: {
            notEmpty: true
        },
        price: {
            notEmpty: true
        },
        priceNegociable: {
            notEmpty: true,
        },
        description: {
            optional: true,
        }
    }),
    editItem: checkSchema({
        state: {
            // optional: true
            notEmpty: true
        },
        category: {
            optional: true,
        },
        images: {
            optional: true
        },
        // delImages:  {
        //     optional: true
        // },
        title: {
            optional: true
        },
        price: {
            optional: true
        },
        priceNegociable: {
            optional: true
        },
        description: {
            optional: true,
        }
    })
}