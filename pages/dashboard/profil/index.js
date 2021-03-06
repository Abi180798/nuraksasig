import Layout from "../../layouts/Layout";
import withPrivateRoute from "../../utils/withPrivateRoute";
import Content from "./components/Content";

function Profil() {
  return (
    <Layout title="Profil">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">Lihat Profil</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active" aria-current="page">Lihat Profil</li>
          </ol>
          <Content />
        </div>
      </main>
    </Layout>
  )
}

export default withPrivateRoute(Profil)