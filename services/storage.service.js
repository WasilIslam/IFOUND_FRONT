import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@' + key, jsonValue)
    } catch (e) {
        // saving error
    }
}


const getData = async (key) => {
    try {
        return JSON.parse(await AsyncStorage.getItem('@' + key))
    } catch (e) {
        // saving error
        console.log(e)
        return null
    }
}


const WipeAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // saving error
        console.log(e)
    }
}
// clearData()
export { storeData, getData, WipeAll  }