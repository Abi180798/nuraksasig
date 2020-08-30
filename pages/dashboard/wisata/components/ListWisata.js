import dataWisata from '../../../../mock/wisata.json'
import Link from 'next/link'

export default function ListWisata() {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Wisata</th>
                <th className="text-center">Lokasi Wisata<br/>(Latitude,Longitude)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataWisata.data.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.nama_wisata}</td>
                  <td>{row.location.lat} , {row.location.lng}</td>
                  <td >
                    <div className="row justify-content-center inline-block">
                      <div className="text-center m-1">
                        <Link href={`/dashboard/wisata/detail?id_wisata=${row.id_wisata}`}
                        as={`/dashboard/wisata/details?id_wisata=${row.id_wisata}`}>
                        <a className="btn btn-success btn-sm">Detail</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <Link href={`/dashboard/wisata/edit?id_wisata=${row.id_wisata}`}
                        as={`/dashboard/wisata/edits?id_wisata=${row.id_wisata}`}>
                        <a className="w- btn btn-warning btn-sm">Edit</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <a className="btn btn-danger btn-sm">Hapus</a>
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