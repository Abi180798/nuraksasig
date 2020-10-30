import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { useRouter } from 'next/router'
import { WisataAPI } from '../../../api/WisataAPI'
import Swal from 'sweetalert2'
import Loading from '../../../utils/Loading'

const $ = require('jquery')
$.Datatable = require('datatables.net')

export default function ListWisata({ wisatas }) {
  const router = useRouter()
  const [state,setState] = useState({
    loading:false
  })
  const deleteWisata = async (id) => {
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
        setState({...state,loading:true})
        const response = await WisataAPI.delWisata(id)
        if (response.status === 500) {
          ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
        } else if (response.status_code === 401) {
          ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
        } else if (response.status_code === 200) {
          ShowNotify("Berhasil hapus wisata", notifyPosition.topCenter, notifyType.success, () => {
            Swal.fire(
              'Terhapus!',
              'Data kamu telah dihapus.',
              'success'
            ).then((result) => {
              router.push("/dashboard/wisata")
              router.reload()
            })
          })
        }
        setState({...state,loading:false})
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
            <Link href="/dashboard/wisata/addz">
              <a className="btn btn-primary float-right mt-3">
                Tambah Data
            </a>
            </Link>
          </div>
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Wisata</th>
                <th className="text-center">Lokasi Wisata<br />(Latitude,Longitude)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {wisatas&&wisatas.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.nama_wisata}</td>
                  <td>{row.latitude} , {row.longitude}</td>
                  <td >
                    <div className="row justify-content-center inline-block">
                      <div className="text-center m-1">
                        <Link href={`/dashboard/wisata/detailz?id_wisata=${row.id_wisata}`}
                          as={`/dashboard/wisata/detailz/${row.id_wisata}`}>
                          <a className="btn btn-success btn-sm">Detail</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <Link href={`/dashboard/wisata/editz?id_wisata=${row.id_wisata}`}
                          as={`/dashboard/wisata/editz/${row.id_wisata}`}>
                          <a className="w- btn btn-warning btn-sm">Edit</a>
                        </Link>
                      </div>
                      <div className="text-center m-1">
                        <a className="btn btn-danger btn-sm"
                          onClick={e => deleteWisata(row.id_wisata)}>
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
      {state.loading&&<Loading/>}
    </div>
  )
}