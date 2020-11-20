import React, { useState, useEffect } from 'react'
import store from 'store'
import withPrivateRoute from '../utils/withPrivateRoute'
import Content from './components/Content'
import Layout from '../layouts/Layout'
import Loading from '../utils/Loading'
import { EventAPI } from '../api/EventAPI'
import { WisataAPI } from '../api/WisataAPI'
import { UserAPI } from '../api/UserAPI'
import { ROLE } from '../../utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'
function Dashboard() {
  const router = useRouter()
  const [state, setState] = useState({
    loading: false
  })
  const [events, setEvents] = useState({
    data: null
  })
  const [wisatas, setWisatas] = useState({
    data: null
  })
  const [users, setUsers] = useState({
    data: null
  })
  async function getData() {
    setState({...state, loading:true})
    const rEvent = await EventAPI.getListEvent()
    const rWisata = await WisataAPI.getListWisata()
    if(store.get(ROLE)==="superadmin"){
      const rUser = await UserAPI.getListUser()
      setUsers({
        data: rUser.data
      })
    }
    setEvents({
      data: rEvent.data
    })
    setWisatas({
      data: rWisata.data
    })
    setState({...state, loading:false})
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout title="Dashboard">
      {events.data && wisatas.data  &&
        <Content events={events.data} wisatas={wisatas.data} users={users.data}/>
      }
      {state.loading&&<Loading/>}
    </Layout>
  )
}

export default withPrivateRoute(Dashboard)