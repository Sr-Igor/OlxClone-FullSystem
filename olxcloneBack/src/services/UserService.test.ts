import * as UserService from "./UserServices"
const User = require("../models/user")

describe("Testing user services", ()=> {
    
    // let name: "name test"
    // let email: "teste@email.com"
    // let password: "12345678"
    // let state: "629f95186c88c8b26ea764e5"


    // beforeAll(async ()=> {
    //     await User.sync({force: true})
    // })

    // it("create new User"), async () => {
    //     const newUser = await UserService.createUser({
    //         name,
    //         email,
    //         password,
    //         state,
    //     })
    //     expect(newUser).not.toBeInstanceOf(Error)
    //     expect(newUser).toHaveProperty("_id")
    // }

    // it("not allowed registered email", async ()=> {
    //     const newUser = await UserService.createUser({
    //         name,
    //         email,
    //         password,
    //         state,
    //     })
    //     expect(newUser).toBeInstanceOf(Error)
    // })

    // it("find user by e-mail", async () => {
    //     const user = UserService.findUserEmail(email) as any
    //     expect(user.email).toBe(email)
    // })

    // it("testing login action TRUE", ()=> {
    //     const result = UserService.singInUser({email, password})
    //     expect(result).not.toBeInstanceOf(Error)
    //     expect(result).toBeInstanceOf(String)
    // })

    // it("testing login action FALSE", ()=> {
    //     const result = UserService.singInUser({email: "123", password:"123"})
    //     expect(result).toBeInstanceOf(Error)
    //     expect(result).not.toBeInstanceOf(String)
    // })

    // it("testing edit user action", async ()=> {
    //     const token = UserService.singInUser({email, password}) as Promise<string>
    //     const result = UserService.updateUser((await token).toString(), {
    //         email: "teste@altered.com",
    //         password: "invalidPassword",
    //         newPassword: "87654321",
    //     }, {file: ""})
    //     expect(result).toBeInstanceOf(Error)
    //     expect(result).not.toBeInstanceOf(String)
    // })

    // it("testing edit user action", async ()=> {
    //     const token = UserService.singInUser({email, password}) as Promise<string>
    //     const result = UserService.updateUser((await token).toString(), {
    //         email: "teste@altered.com",
    //         password: "12345678",
    //         newPassword: "87654321",
    //     }, {file: ""})
    //     expect(result).not.toBeInstanceOf(Error)
    //     expect(result).toBeInstanceOf(String)
    // })

})