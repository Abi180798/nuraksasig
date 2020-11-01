import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from "../../../layouts/Layout";
import FormEvent from "../components/FormEvent";
import { useRouter } from 'next/router'
import { EventAPI } from '../../../api/EventAPI';
import Loading from '../../../utils/Loading';
import withPrivateRoute from '../../../utils/withPrivateRoute';

function Detailz() {
    const router = useRouter()
    const [state, setState] = useState({
        loading: false
    })
    const [events, setEvents] = useState({
        data: null
    })
    async function getData() {
        setState({ ...state, loading: true })
        const r = await EventAPI.getListEvent()
        setEvents({
            data: r.data
        })
        setState({ ...state, loading: false })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout title="Event">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Detail Event</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">Event</li>
                        <li className="breadcrumb-item active" aria-current="page">Detail</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                            {events.data &&
                                <FormEvent dataEvent={events.data && events.data.filter((row) => row.id_event.toString() === router.query.id)[0]} mode="detail"/>
                            }
                        </div>
                    </div>
                </div>
            </main>
            {state.loading&&<Loading/>}
        </Layout>
    )
}

export default withPrivateRoute(Detailz)