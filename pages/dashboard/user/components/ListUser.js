import React, { useEffect, useState } from 'react'
import store from 'store'
import Link from 'next/link'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { useRouter } from 'next/router'
import { USER } from '../../../../utils/constants'

const $ = require('jquery')
$.Datatable = require('datatables.net')

export default function ListUser({ dataUser }) {
  console.log(dataUser)
  const router = useRouter()
  const [state, setState] = useState({
    loading: false
  })
  const deleteUser = async (id) => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Anda akan menghapus data ini jika melanjutkan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setState({ ...state, loading: true })
        // const response = await UserAPI.delWisata(id)
        if (response.status === 500) {
          ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
        } else if (response.status_code === 401) {
          ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
        } else if (response.status_code === 200) {
          ShowNotify("Berhasil hapus user", notifyPosition.topCenter, notifyType.success, () => {
            Swal.fire(
              'Terhapus!',
              'Data kamu telah dihapus.',
              'success'
            ).then((result) => {
              router.reload()
            })
          })
        }
        setState({ ...state, loading: false })
      }
    })
  }
  useEffect(() => {
    $.Datatable = require('../../../../static/js/dataTables.bootstrap4.min.js')
    $('#dataTable').dataTable({
      "pagingType": "simple_numbers"
    });
  }, [])
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
                <th>Nama Admin</th>
                <th>Alamat</th>
                <th>No Telepon</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataUser&&dataUser.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.nama_admin}</td>
                  <td>{row.alamat}</td>
                  <td>{row.no_hp}</td>
                  <td>
                    {row.role}
                    {" "}
                    <span 
                    className={row.id_admin === store.get(USER).id_admin ? "" : "d-none"}
                    style={row.id_admin === store.get(USER).id_admin ? {color:"orange"} : {}}>
                      <i className="fas fa-circle" />
                      </span>
                      </td>
                  <td >
                    <div className="row justify-content-center inline-block">
                      <div className="text-center m-1">
                        <Link prefetch href={`/dashboard/user/detailz?id_user=${row.id_admin}`}
                          as={`/dashboard/user/detailz/${row.id_admin}`}>
                          <a className="btn btn-success btn-sm">Detail</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <Link prefetch href={`/dashboard/user/editz?id_user=${row.id_admin}`}
                          as={`/dashboard/user/editz/${row.id_admin}`}>
                          <a className="w- btn btn-warning btn-sm">Edit</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <a className="btn btn-danger btn-sm"
                          onClick={e => deleteUser(row.id_admin)}>
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