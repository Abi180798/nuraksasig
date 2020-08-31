import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Layout from "../../layouts/Layout";
import ListEvent from "./components/ListEvent";

export default function EventAdmin() {
    const [events,setEvents] = useState({
        data:null
      })
      async function getData() {
        const r = await axios.get("https://tahuraevent.herokuapp.com/event/getall")
        setEvents({
          data:r.data
        })
      }
      useEffect(() => {
        getData()
      }, [])
    return (
        <Layout title="Event">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Daftar Event</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item active" aria-current="page">Event</li>
                    </ol>
                    <ListEvent events={events.data}/>
                </div>
            </main>
        </Layout>
    )
}