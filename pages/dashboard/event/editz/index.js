import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Layout from "../../../layouts/Layout";
import FormEvent from "../components/FormEvent";
import { useRouter } from 'next/router'

export default function Editz(){
    const router = useRouter()
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
    return(
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Edit Event</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">Event</li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                        {events.data&&
                    <FormEvent dataEvent={events.data&&events.data.event.filter((row)=>row.id.toString()===router.query.id)[0]}/>
                            }                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}