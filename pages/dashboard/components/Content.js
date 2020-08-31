import Link from 'next/link'
import store from 'store'
import dataWisata from '../../../mock/wisata.json'
import dataUser from '../../../mock/user.json'

export default function Content({ events }) {
  console.log("eccc", events)
  return (
    <main>
      <div className="container-fluid">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div className="row">
          <div className="col-xl-6 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-header">Jumlah Data Wisata</div>
              <div className="card-body text-center" style={{ fontSize: 50, fontWeight: "bold" }}>{dataWisata.data && dataWisata.data.length}</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href="/dashboard/wisata">
                  <a className="small text-white stretched-link">View Details</a>
                </Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-header">Jumlah Data Event</div>
              <div className="card-body text-center" style={{ fontSize: 50, fontWeight: "bold" }}>{events && events.event.length}</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href="/dashboard/event">
                  <a className="small text-white stretched-link">View Details</a>
                </Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          {store.get("token") === "superadmin" &&
            <div className="col-xl-6 col-md-6">
              <div className="card bg-info text-white mb-4">
                <div className="card-header">Jumlah Data User</div>
                <div className="card-body text-center" style={{ fontSize: 50, fontWeight: "bold" }}>{dataUser.data && dataUser.data.length}</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link href="/dashboard/user">
                    <a className="small text-white stretched-link">View Details</a>
                  </Link>
                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  )
}