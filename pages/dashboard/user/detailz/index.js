import Layout from "../../../layouts/Layout";
import FormUser from "../components/FormUser";
import dataUser from '../../../../mock/user.json'
import { useRouter } from 'next/router'
import withPrivateRoute from "../../../utils/withPrivateRoute";
import { useEffect, useState } from "react";
import { UserAPI } from "../../../api/UserAPI";
import Loading from "../../../utils/Loading";

function Detailz(){
    const router = useRouter()
    const [state, setState] = useState({
        loading: false
    })
    const [users, setUsers] = useState({
        data: null
    })
    async function getData() {
        setState({ ...state, loading: true })
        const r = await UserAPI.getListUser()
        setUsers({
            data: r.data
        })
        setState({ ...state, loading: false })
    }
    useEffect(() => {
        getData()
    }, [])
    return(
        <Layout title="User">
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
                        {users.data &&
                    <FormUser dataUser={users.data.filter((row)=>row.id_admin.toString()===router.query.id_user)[0]}/>
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