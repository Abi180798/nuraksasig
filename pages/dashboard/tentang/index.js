import Layout from "../../layouts/Layout";
import Content from "./components/Content";

export default function Tentang() {
  return (
    <Layout title="Tentang">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">LTentang</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active" aria-current="page">Tentang</li>
          </ol>
          <Content />
        </div>
      </main>
    </Layout>
  )
}