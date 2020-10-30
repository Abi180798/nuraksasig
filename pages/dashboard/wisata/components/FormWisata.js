import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dataWisatas from '../../../../mock/wisata.json'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { WisataAPI } from '../../../api/WisataAPI'
import Loading from '../../../utils/Loading'
export default function FormWisata({ dataWisata, mode }) {
  const router = useRouter()
  const [state,setState] = useState({
    loading:false
  })
  return (
    <div>
    <Formik
      initialValues={{
        nama_wisata: dataWisata && dataWisata.nama_wisata || '',
        alamat_wisata: dataWisata && dataWisata.alamat_wisata || '',
        deskripsi_wisata: dataWisata && dataWisata.deskripsi_wisata || '',
        kategori: dataWisata && dataWisata.kategori || '',
        latitude: dataWisata && dataWisata.latitude || '',
        longitude: dataWisata && dataWisata.longitude || ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          const finalValues = {
            nama_wisata: values.nama_wisata,
            alamat_wisata: values.alamat_wisata,
            deskripsi_wisata: values.deskripsi_wisata,
            kategori: values.kategori,
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude)
          }
          setState({...state,loading:true})
          if (router.pathname.split("/")[3] === "addz") {
            const response = await WisataAPI.addWisata(finalValues)
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil tambah wisata!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          } else if (router.pathname.split("/")[3] === "editz") {
            const response = await WisataAPI.putWisata(finalValues, window.location.pathname.split("editz/")[1])
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil edit wisata!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          }
          setState({...state,loading:false})
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-4 d-flex align-items-center">
                <label className="label-login">Nama Wisata</label>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Nama Wisata"
                  type="text"
                  name="nama_wisata"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nama_wisata}
                />
              </div>
              <small className="label-login-error">{errors.nama_wisata && touched.nama_wisata && errors.nama_wisata}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4 d-flex align-items-center">
                <label className="label-login">Alamat Wisata</label><br />
              </div>
              <div className="col-xl-8">
                <textarea
                  className="form-control input-wisata"
                  placeholder="Masukkan Alamat Wisata"
                  type="textarea"
                  name="alamat_wisata"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alamat_wisata}
                />
              </div>
              <small className="label-login-error">{errors.alamat_wisata && touched.alamat_wisata && errors.alamat_wisata}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4 d-flex align-items-center">
                <label className="label-login">Deskripsi Wisata</label><br />
              </div>
              <div className="col-xl-8">
                <textarea
                  className="form-control input-wisata"
                  placeholder="Masukkan Deskripsi Wisata"
                  type="textarea"
                  name="deskripsi_wisata"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.deskripsi_wisata}
                />
              </div>
              <small className="label-login-error">{errors.deskripsi_wisata && touched.deskripsi_wisata && errors.deskripsi_wisata}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4 d-flex align-items-center">
                <label className="label-login">Kategori</label><br />
              </div>
              <div className="col-xl-8">
                <select
                  className="custom-select custom-select-md"
                  defaultValue={values.kategori !== "" ? values.kategori : ""}
                  onChange={e => setFieldValue("kategori", e.target.value)}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Wisata Alam">Wisata Alam</option>
                  <option value="Wisata Binatang">Wisata Binatang</option>
                  <option value="Taman Hiburan">Taman Hiburan</option>
                  <option value="Wisata Religi">Wisata Religi</option>
                  <option value="Wisata Sejarah">Wisata Sejarah</option>
                </select>
              </div>
              <small className="label-login-error">{errors.kategori && touched.kategori && errors.kategori}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4 d-flex align-items-center">
                <label className="label-login">Lokasi Wisata</label><br />
              </div>
              <div className="col-xl-8">
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      className="form-control input-wisata mt-1"
                      placeholder="Masukkan Latitude"
                      type="text"
                      name="latitude"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.latitude}
                    /><br />
                    <small className="label-login-error">{errors.latitude && touched.latitude && errors.latitude}</small>
                  </div>
                  <div className="col-xl-6">
                    <input
                      className="form-control input-wisata mt-1"
                      placeholder="Masukkan Longitude"
                      type="text"
                      name="longitude"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.longitude}
                    /><br />
                    <small className="label-login-error">{errors.latitude && touched.latitude && errors.latitude}</small>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              {router.pathname.split("/")[3] !== "detailz" &&
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Submit
           </button>
              }
              <button onClick={e => router.push("/dashboard/wisata")} className="btn btn-dark float-right" disabled={isSubmitting}>
                Back
           </button>
            </div>
          </form>
        )}
    </Formik>
    {state.loading&&<Loading/>}
    </div>
  )
}