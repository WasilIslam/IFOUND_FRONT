import { API_KEY } from "@env";
import { getData } from "./storage.service";

import axios from "axios";
export const PostLostCase = async(data) => {
    const token = await getData("token")
    const { data:res } = await axios.post(API_KEY + "case/lost",{...data,token})
    return res
}

export const PostFoundCase = async(data) => {
    const token = await getData("token")
    const { data:res } = await axios.post(API_KEY + "case/found",{...data,token})
    return res
}

export const PostPremium = async(_id) => {
    const token = await getData("token")
    const data={_id}
    const { data:res } = await axios.post(API_KEY + "case/premium",{...data,token})
    return res
}
export const GetPremiumCases = async() => {
    const { data:res } = await axios.get(API_KEY + "premium")
    return res
}

export const FoundConfirm = async(_id) => {
    //id is case id
    console.log(_id)
    const token = await getData("token")
    const { data:res } = await axios.post(API_KEY + "foundconfirm",{_id},{headers:{token}})
    return res
}

export const ResolveCase = async(_id,type) => {
    //id is case id
    console.log(_id)
    const { data:res } = await axios.post(API_KEY + "resolvecase",{_id,type})
    return res
}

export const GetMyCases = async() => {
    //id is case id
    const token = await getData("token")
    const { data:res } = await axios.get(API_KEY + "mycases",{headers:{token}})
    return res
}
