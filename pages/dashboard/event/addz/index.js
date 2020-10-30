import Layout from "../../../layouts/Layout";
import FormEvent from "../components/FormEvent";
import { useRouter } from 'next/router'
import withPrivateRoute from "../../../utils/withPrivateRoute";

function Addz(){
    const router = useRouter()

    return(
        <Layout title="Event">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Add Event</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">Event</li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                    <FormEvent/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default withPrivateRoute(Addz)