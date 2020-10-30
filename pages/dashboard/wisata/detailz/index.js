import Layout from "../../../layouts/Layout";
import FormWisata from "../components/FormWisata";
import dataWisata from '../../../../mock/wisata.json'
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { WisataAPI } from "../../../api/WisataAPI";
import Loading from "../../../utils/Loading";
import withPrivateRoute from "../../../utils/withPrivateRoute";

function Detailz(){
    const router = useRouter()
    const [state, setState] = useState({
      loading: false
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
    return(
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Detail Wisata</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">Wisata</li>
                        <li className="breadcrumb-item active" aria-current="page">Detail</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                            {wisatas.data&&
                    <FormWisata dataWisata={wisatas.data.filter((row)=>row.id_wisata.toString()===router.query.id_wisata)[0]} mode="taek"/>
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