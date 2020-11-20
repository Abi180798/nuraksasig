import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { UserAPI } from '../../../api/UserAPI'
import * as Yup from 'yup'

export default function FormUser({ dataUser }) {
  console.log("coba",dataUser)
  const router = useRouter()
  const [state, setState] = useState({
    loading: false,
    togglePass: false
  })
  return (
    <Formik
      initialValues={{
        nama_admin: dataUser && dataUser.nama_admin || '',
        alamat: dataUser && dataUser.alamat || '',
        no_hp: dataUser && dataUser.no_hp || '',
        username: dataUser && dataUser.username || '',
        password: dataUser && dataUser.password || '',
        role: dataUser && dataUser.role || '',
      }}
      validationSchema={
        Yup.object({
          nama_admin: Yup.string().required("Harus diisi"),
          alamat: Yup.string().required(" Harus diisi"),
          no_hp: Yup.string().required(" Harus diisi"),
          username: Yup.string().required(" Harus diisi"),
          password: Yup.string().required(" Harus diisi"),
          role: Yup.string().required(" Harus diisi"),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setState({ ...state, loading: true })
          if (router.pathname.split("/")[3] === "addz") {
            const response = await UserAPI.addUser(values)
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil tambah user!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          } else if (router.pathname.split("/")[3] === "editz") {
            const response = await UserAPI.putUser(values, window.location.pathname.split("editz/")[1])
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil edit user!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          }
          setState({ ...state, loading: false })
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
          <form onSubmit={handleSubmit}>{console.log("valu",values)}
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Nama Lengkap</label>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Nama Lengkap"
                  type="text"
                  name="nama_admin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nama_admin}
                />
                <small className="label-login-error">{errors.nama_admin && touched.nama_admin && errors.nama_admin}</small>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Alamat</label><br />
              </div>
              <div className="col-xl-8">
                <textarea
                  className="form-control input-wisata"
                  placeholder="Masukkan Alamat"
                  type="text"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alamat}
                />
                <small className="label-login-error">{errors.alamat && touched.alamat && errors.alamat}</small>
              </div>
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
                <small className="label-login-error">{errors.no_hp && touched.no_hp && errors.no_hp}</small>
              </div>
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
                <small className="label-login-error">{errors.username && touched.username && errors.username}</small>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Password</label><br />
              </div>
              <div className="col-xl-8">
                <div className="form-group">
                  <div className="input-group" id="show_hide_password">
                    <input
                      className="form-control"
                      placeholder="Masukkan Password"
                      type={state.togglePass ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <div className="input-group-prepend" id="hider" onClick={e => setState({ ...state, togglePass: !state.togglePass })}>
                      <span className="input-group-text" id="validationTooltipUsernamePrepend"><i class={state.togglePass ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i></span>
                    </div>
                  </div>
                  <small className="label-login-error">{errors.password && touched.password && errors.password}</small>
                </div>
              </div>
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
                  onChange={e => setFieldValue("role", e.target.value)}
                  onBlur={handleBlur}
                  defaultValue={values.role !== "" ? values.role : ""}
                >
                  <option value="">Pilih Role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  {/* <option value="user">User</option> */}
                </select>
                <small className="label-login-error">{errors.deskripsi_alamat && touched.deskripsi_alamat && errors.deskripsi_alamat}</small>
              </div>
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