import Layout from "../../layouts/Layout";
import ListWisata from "./components/ListWisata";

export default function WisataAdmin() {
    return (
        <Layout title="Wisata">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Daftar Wisata</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item">Manajemen Data</li>
                        <li className="breadcrumb-item active" aria-current="page">Wisata</li>
                    </ol>
                    <ListWisata />
                </div>
            </main>
        </Layout>
    )
}