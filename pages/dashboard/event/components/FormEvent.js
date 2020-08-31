import { Formik } from 'formik'
import { useRouter } from 'next/router'
export default function FormEvent({dataEvent}) {
  const router = useRouter()
  // console.log("taek",dataEvent&&dataEvent)
  // const data_wisata = dataWisata.filter((row)=>row.id_wisata.toString()===router.query.id_wisata)
  return (
    // dataWisata===undefined?"":
    <Formik
      initialValues={{ 
        name: dataEvent&&dataEvent.name||'',
       kota: dataEvent&&dataEvent.kota||'',
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
                <label className="label-login">Nama Event</label>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Nama Event"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <small className="label-login-error">{errors.name && touched.name && errors.name}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Alamat Wisata</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Kota"
                  type="text"
                  name="kota"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.kota}
                />
              </div>
              <small className="label-login-error">{errors.kota && touched.kota && errors.kota}</small>
              </div>
              <br/>
            <div>
              {console.log("router",router.pathname)}
              {router.pathname.split("/")[3]!=="detailz"&&
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Submit
           </button>
              }
              <button onClick={e => router.push("/dashboard/event")} className="btn btn-dark float-right" disabled={isSubmitting}>
                Back
           </button>
            </div>
          </form>
        )}
    </Formik>
  )
}