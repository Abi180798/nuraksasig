import axios from 'axios'
export const EventAPI = {
    async getListEvent(){
        const r = await axios.get("https://tahuraevent.herokuapp.com/event/getall")
        return r.data;
    }
}