import { API_KEY } from "@env";

import axios from "axios";
import { storeData, getData, WipeAll } from "./storage.service"
export const userSignUp = async (data) => {
    const { data: {user,token} } = await axios.post(API_KEY + "users/signup", data);
    await storeData("token", token)
    console.log(token)
    return user
}
export const userLogIn = async(data) => {
    const { data: {user,token} } = await axios.post(API_KEY + "users/login", data);
    await storeData("token", token)
    console.log(user,token)
    return user
}
export const getUser = async() => {
    const token = await getData("token")
    if(!token) throw new Error("TOKEN NOT FOUND!")
    const { data: user } = await axios.get(API_KEY+"users/tokenlogin", { headers: { token } })
    //saving the user here
    return user
}
export const logOut= async()=>{
    WipeAll()
}