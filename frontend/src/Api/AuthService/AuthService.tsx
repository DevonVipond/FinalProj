import axios from '../../Axios/Axios'
import { AuthenticatedUser } from '../../Models/Interfaces/AuthenticatedUser'

//class AuthApi {
//
//    constructor() { }
//
//    async logout(): Promise<void> {
//        new StorageApi().store('auth', 'false')
//    }
//
//    async login(username: string, password: string): Promise<void> {
//        try {
//            const res = await axios.post('/login')
//
//            if (res.status !== 200) {
//                throw Error('Connection Failed')
//            }
//
//            new StorageApi().store('auth', 'true')
//
//        } catch (e) {
//            throw e
//        }
//    }
//
//    async register(username: string, password: string): Promise<void> {
//        try {
//            const res = await axios.post('/register')
//
//            if (res.status !== 200) {
//                throw Error('Connection Failed')
//            }
//
//            new StorageApi().store('auth', 'true')
//
//        } catch(e) {
//            throw e
//        }
//    }
//
//}

class StorageApi {
    constructor() { }

    store(key: string, value: string): void  {
        sessionStorage.setItem(key, value)
    }

    get(key: string): any  {
        return sessionStorage.getItem(key)
    }
}

//const authApi: AuthApi = Object.freeze(new AuthApi())

//export default authApi