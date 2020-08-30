import Layout from "../../layouts/Layout";
import ListUser from "./components/ListUser";

export default function UserAdmin() {
  return (
    <Layout title="User">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">Daftar User</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Manajemen Data</li>
            <li class="breadcrumb-item active" aria-current="page">User</li>
          </ol>
          <ListUser />
        </div>
      </main>
    </Layout>
  )
}