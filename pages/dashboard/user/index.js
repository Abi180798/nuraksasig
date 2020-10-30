import { useEffect, useState } from "react";
import { UserAPI } from "../../api/UserAPI";
import Layout from "../../layouts/Layout";
import Loading from "../../utils/Loading";
import withPrivateRoute from "../../utils/withPrivateRoute";
import ListUser from "./components/ListUser";

function UserAdmin() {
  const [state,setState] = useState({
    loading:false
  })
  const [users, setUsers] = useState({
    data: null
  })
  async function getData() {
    setState({...state,loading:true})
    const r = await UserAPI.getListUser()
    setUsers({
      data: r.data
    })
    setState({...state,loading:false})
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout title="User">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">Daftar User</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Manajemen Data</li>
            <li className="breadcrumb-item active" aria-current="page">User</li>
          </ol>
          {users.data&&<ListUser dataUser={users.data}/>}
        </div>
      </main>
      {state.loading&&<Loading/>}
    </Layout>
  )
}

export default withPrivateRoute(UserAdmin)