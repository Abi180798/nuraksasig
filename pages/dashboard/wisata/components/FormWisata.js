import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dataWisatas from '../../../../mock/wisata.json'
export default function FormWisata({dataWisata}) {
  const router = useRouter()
  // console.log("taek",dataWisata&&dataWisata.nama_wisata)
  // const data_wisata = dataWisata.filter((row)=>row.id_wisata.toString()===router.query.id_wisata)
  return (
    // !dataWisata?"":
    <Formik
      initialValues={{ 
        nama_wisata: dataWisata&&dataWisata.nama_wisata||'',
       alamat_wisata: dataWisata&&dataWisata.alamat_wisata||'',
       deskripsi_alamat:dataWisata&&dataWisata.deskripsi_alamat||'',
       latitude:dataWisata&&dataWisata.location.lat||'',
       longitude:dataWisata&&dataWisata.location.lng||''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if(router.pathname.split("/")[3]==="addz"){
            console.log("add")
          }else if(router.pathname.split("/")[3]==="editz"){
            console.log("edit")
          }
          alert(JSON.stringify(values))
          
          // if (values.username === "admin" && values.password === "123") {
          //   router.push('/dashboard')
          // } else {
          //   alert("Username atau password anda salah!")
          // }
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
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-4">
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
              <div className="col-xl-4">
                <label className="label-login">Alamat Wisata</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Alamat Wisata"
                  type="text"
                  name="alamat_wisata"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alamat_wisata}
                />
              </div>
              <small className="label-login-error">{errors.alamat_wisata && touched.alamat_wisata && errors.alamat_wisata}</small>
              </div>
              <br/>
            <div className="row">
              <div className="col-xl-4">
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
                  value={values.deskripsi_alamat}
                />
              </div>
              <small className="label-login-error">{errors.deskripsi_alamat && touched.deskripsi_alamat && errors.deskripsi_alamat}</small>
              </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
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
                /><br/>
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
                /><br/>
              <small className="label-login-error">{errors.latitude && touched.latitude && errors.latitude}</small>
                  </div>
                </div>
              </div>
              </div>
            <br />
            <div>
              {router.pathname.split("/")[3]!=="detailz"&&
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
  )
}