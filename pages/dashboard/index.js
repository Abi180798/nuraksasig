import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import withPrivateRoute from '../utils/withPrivateRoute'
import NavbarAdmin from '../layouts/NavbarAdmin'
import SidebarAdmin from '../layouts/SidebarAdmin'
import Content from './components/Content'
import FooterAdmin from '../layouts/FooterAdmin'
import Layout from '../layouts/Layout'
function Dashboard(){
    const [events, setEvents] = useState({
        data: null
      })
      async function getData() {
        const r = await axios.get("https://tahuraevent.herokuapp.com/event/getall")
        setEvents({
          data: r.data
        })
      }
      useEffect(() => {
        getData()
      }, [])
    return(
        <Layout title="Dashboard">
            {console.log(events)}
            {events&&
            <Content events={events}/>
            }
        </Layout>
    )
}

export default withPrivateRoute(Dashboard)