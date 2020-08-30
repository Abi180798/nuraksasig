import Layout from "../../../layouts/Layout";
import FormWisata from "../components/FormWisata";
import dataWisata from '../../../../mock/wisata.json'
import { useRouter } from './node_modules/next/router'

export default function Edit(){
    const router = useRouter()

    return(
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Edit Wisata</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">Wisata</li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                    <FormWisata dataWisata={dataWisata.data.filter((row)=>row.id_wisata.toString()===router.query.id_wisata)[0]}/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}