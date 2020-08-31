import React,{useEffect} from 'react'
import dataUser from '../../../../mock/user.json'
import Link from 'next/link'
import {popUpAlert, popUpAlertEvent} from '../../../../utils/popup'
import ShowAlert from '../../../../utils/notification'
import {useRouter} from 'next/router'

export default function ListUser() {
  const router = useRouter()
  useEffect(()=>{
    $('#dataTable').dataTable( {
      "pagingType": "full_numbers"
    } );
  },[])
  return (
    <div className="card mb-4">
      <div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
        <div className="mr-0 mt-0">
          <Link href="/dashboard/user/addz">
          <a className="btn btn-primary float-right mt-3">
            Tambah Data
            </a>
          </Link>
            </div>
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama User</th>
                <th>No Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.data.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.nama_lengkap}</td>
                  <td>{row.no_hp}</td>
                  <td >
                    <div className="row justify-content-center inline-block">
                      <div className="text-center m-1">
                        <Link prefetch href={`/dashboard/user/detailz?id_user=${row.id_user}`}
                        as={`/dashboard/user/detailz/${row.id_user}`}>
                        <a className="btn btn-success btn-sm">Detail</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <Link prefetch href={`/dashboard/user/editz?id_user=${row.id_user}`}
                        as={`/dashboard/user/editz/${row.id_user}`}>
                        <a className="w- btn btn-warning btn-sm">Edit</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <a className="btn btn-danger btn-sm"
                        onClick={e=>popUpAlertEvent("Apakah Anda Yakin",
                        "Terhapus","warning","success","Hapus","Kembali",
                        router.push("/dashboard/user"),"")}>
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