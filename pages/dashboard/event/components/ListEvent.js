import dataWisata from '../../../../mock/wisata.json'
import Link from 'next/link'
import {popUpAlert, popUpAlertEvent} from '../../../../utils/popup'
import ShowAlert from '../../../../utils/notification'
import {useRouter} from 'next/router'

export default function ListEvent({events}) {
  console.log("eventsss",events)
  const router = useRouter()
  return (
    <div className="card mb-4">
      <div>
        <div className="mr-4 mt-2">
          <Link href="/dashboard/event/addz">
          <a className="btn btn-primary float-right">
            Tambah Data
            </a>
          </Link>
            </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Event</th>
                <th className="text-center">Lokasi Event<br/>(Latitude,Longitude)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events&&events.event.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.kota}</td>
                  <td >
                    <div className="row justify-content-center inline-block">
                      <div className="text-center m-1">
                        <Link href={`/dashboard/event/detailz?id=${row.id}`}
                        as={`/dashboard/event/detailz/${row.id}`}>
                        <a className="btn btn-success btn-sm">Detail</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <Link href={`/dashboard/event/editz?id=${row.id}`}
                        as={`/dashboard/event/editz/${row.id}`}>
                        <a className="w- btn btn-warning btn-sm">Edit</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <a className="btn btn-danger btn-sm"
                        onClick={e=>popUpAlertEvent("Apakah Anda Yakin",
                        "Terhapus","warning","success","Hapus","Kembali",
                        router.push("/dashboard/event"),"")}>
                          Hapus</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}