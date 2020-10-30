import Head from "next/head";
import { useEffect, useState } from "react";
import { WisataAPI } from "../../api/WisataAPI";
import Layout from "../../layouts/Layout";
import Loading from "../../utils/Loading";
import ListWisata from "./components/ListWisata";
import withPrivateRoute from '../../utils/withPrivateRoute'

function WisataAdmin() {
  const [state,setState] = useState({
    loading:false
  })
  const [wisatas, setWisatas] = useState({
    data: null
  })
  async function getData() {
    setState({...state,loading:true})
    const rWisata = await WisataAPI.getListWisata()
    setWisatas({
      data: rWisata.data
    })
    setState({...state,loading:false})
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout title="Wisata">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">Daftar Wisata</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Manajemen Data</li>
            <li className="breadcrumb-item active" aria-current="page">Wisata</li>
          </ol>
          {
            wisatas.data&&<ListWisata wisatas={wisatas.data}/>
          }
        </div>
      </main>
      {state.loading&&<Loading/>}
    </Layout>
  )
}

export default withPrivateRoute(WisataAdmin)