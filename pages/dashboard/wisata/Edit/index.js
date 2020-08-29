import Layout from "../../../layouts/Layout";
import FormWisata from "../components/FormWisata";
import dataWisata from '../../../../mock/wisata.json'

export default function Edit(){
    return(
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Edit Wisata</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li class="breadcrumb-item">Wisata</li>
                        <li class="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                    <FormWisata dataWisata={dataWisata.data}/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}