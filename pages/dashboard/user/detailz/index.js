import Layout from "../../../layouts/Layout";
import FormUser from "../components/FormUser";
import dataUser from '../../../../mock/user.json'
import { useRouter } from 'next/router'

export default function Detailz(){
    const router = useRouter()
    return(
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Detail User</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">User</li>
                        <li className="breadcrumb-item active" aria-current="page">Detail</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                    <FormUser dataUser={dataUser.data.filter((row)=>row.id_user.toString()===router.query.id_user)[0]}/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}