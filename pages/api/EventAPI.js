import { getWithoutAuth, deleteWithAuth, postWithAuth, putWithAuth } from '../../utils/requestHandler'

const BASE_URL = "https://eventtahura.herokuapp.com"

export const EventAPI = {
    async getListEvent() {
        const r = await getWithoutAuth(`${BASE_URL}/event`)
        return r;
    },
    async addEvent(data) {
        const r = await postWithAuth(`${BASE_URL}/event`, data)
        return r;
    },
    async putEvent(data, id) {
        const r = await putWithAuth(`${BASE_URL}/event/${id}`, data)
        return r;
    },
    async delEvent(id) {
        const r = await deleteWithAuth(`${BASE_URL}/event/${id}`)
        return r;
    }
}