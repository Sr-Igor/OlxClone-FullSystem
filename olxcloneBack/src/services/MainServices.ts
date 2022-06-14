const User = require("../models/user")

export const findUser = async (token: string|undefined) => {
    return await User.findOne({token})
}
