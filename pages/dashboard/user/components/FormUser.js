import { Formik } from 'formik'
import { useRouter } from 'next/router'
export default function FormUser({ dataUser }) {
  const router = useRouter()
  // console.log("taek",dataUser&&dataUser.nama_lengkap)
  // const data_wisata = dataWisata.filter((row)=>row.id_wisata.toString()===router.query.id_wisata)
  return (
    // dataWisata===undefined?"":
    <Formik
      initialValues={{
        nama_lengkap: dataUser && dataUser.nama_lengkap || '',
        alamat: dataUser && dataUser.alamat || '',
        no_hp: dataUser && dataUser.no_hp || '',
        username: dataUser && dataUser.username || '',
        password: dataUser && dataUser.password || '',
        role: dataUser && dataUser.role || '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (router.pathname.split("/")[3] === "addz") {
            console.log("add")
          } else if (router.pathname.split("/")[3] === "editz") {
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
        setFieldValue
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Nama Lengkap</label>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Nama Lengkap"
                  type="text"
                  name="nama_lengkap"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nama_lengkap}
                />
              </div>
              <small className="label-login-error">{errors.nama_lengkap && touched.nama_lengkap && errors.nama_lengkap}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Alamat</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Alamat"
                  type="text"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alamat}
                />
              </div>
              <small className="label-login-error">{errors.alamat && touched.alamat && errors.alamat}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">No Telepon</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan No Telepon"
                  type="text"
                  name="no_hp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.no_hp}
                />
              </div>
              <small className="label-login-error">{errors.no_hp && touched.no_hp && errors.no_hp}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Username</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </div>
              <small className="label-login-error">{errors.username && touched.username && errors.username}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Password</label><br />
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Password"
                  type="text"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              <small className="label-login-error">{errors.password && touched.password && errors.password}</small>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Role</label><br />
              </div>
              <div className="col-xl-8">
                <select 
                className="form-control input-wisata custom-select"
                name="role"
                onChange={e=>setFieldValue("role",e)}
                onBlur={handleBlur}
                value={values.role}
                >
                  <option selected>Pilih Role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  {/* <option value="user">User</option> */}
                </select>
              </div>
              <small className="label-login-error">{errors.deskripsi_alamat && touched.deskripsi_alamat && errors.deskripsi_alamat}</small>
            </div>
            <br />
            <div>
              {router.pathname.split("/")[3] !== "detailz" &&
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Submit
           </button>
              }
              <button onClick={e => router.push("/dashboard/user")} className="btn btn-dark float-right" disabled={isSubmitting}>
                Back
           </button>
            </div>
          </form>
        )}
    </Formik>
  )
}