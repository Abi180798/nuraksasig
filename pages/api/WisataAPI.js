import { getWithoutAuth, postWithAuth, deleteWithAuth, putWithAuth } from '../../utils/requestHandler'

const BASE_URL = "https://tahurawisata.herokuapp.com"

export const WisataAPI = {
    async getListWisata() {
        const r = await getWithoutAuth(`${BASE_URL}/wisata`)
        return r;
    },
    async addWisata(data) {
        const r = await postWithAuth(`${BASE_URL}/wisata`, data)
        return r;
    },
    async putWisata(data, id) {
        const r = await putWithAuth(`${BASE_URL}/wisata/${id}`, data)
        return r;
    },
    async delWisata(id) {
        const r = await deleteWithAuth(`${BASE_URL}/wisata/${id}`)
        return r;
    }
}