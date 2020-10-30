import Layout from "../../../layouts/Layout";
import FormUser from "../components/FormUser";
import dataUser from '../../../../mock/user.json'
import { useRouter } from 'next/router'
import withPrivateRoute from "../../../utils/withPrivateRoute";

function Addz(){
    const router = useRouter()

    return(
        <Layout title="User">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Add User</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item">User</li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                    <div className="card">
                        <div className="card-body ml-5 mr-5">
                    <FormUser />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default withPrivateRoute(Addz)