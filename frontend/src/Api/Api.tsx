import axios from "../Axios/Axios"

class Api {
    protected _api: any = axios

    public async get(url: string): Promise<any> {

        try {

            const res = await this._api.get(url) 

            if (res.status !== 200) {
                throw Error('BaseApi -> get failed with url ' + url)
            }

            return res.data

        } catch (e) {

            throw e

        }
    }

    public async post(url: string, body: any = {}): Promise<any> {

        try {

            const res = await this._api.post(url, body) 

            if (res.status !== 200) {
                throw Error('BaseApi->post failed with url ' + url)
            }

            return res.data

        } catch (e) {
            throw e
        }
    }

}

export const api = new Api()

