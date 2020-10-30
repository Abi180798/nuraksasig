import { Formik } from 'formik'
import { useRouter } from 'next/router'
import store from 'store'
import qs from 'qs'
import Loading from '../../utils/Loading'
import { UserAPI } from '../../api/UserAPI'
import { TOKEN,USER,ROLE } from '../../../utils/constants'
import { ShowNotify, notifyPosition, notifyType } from '../../../utils/notification'
import { useState } from 'react'
export default function FormLogin() {
  const router = useRouter()
  const [state,setState] = useState({
    loading:false
  })
  return (
    <div>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setState({...state,loading:true})
          const response = await UserAPI.login(qs.stringify({
            username: values.username,
            password: values.password
          }))
          if (response.status === 500) {
            ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
          } else if (response.status === 404) {
            ShowNotify("Username or password invalid.", notifyPosition.topCenter, notifyType.error)
          } else {
            ShowNotify("Anda telah berhasil login", notifyPosition.topCenter, notifyType.success, () => {
              store.set(USER, response.data.user)
              store.set(ROLE, response.data.user.role)
              store.set(TOKEN, response.data.token)
              router.push("/dashboard")
            })
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
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <label className="label-login">Username</label>
            <input
              className="form-control input-login"
              autoFocus
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <small className="label-login-error">{errors.email && touched.email && errors.email}</small>
            <br />
            <label className="label-login">Password</label><br />
            <input
              className="form-control input-login"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <small className="label-login-error">{errors.password && touched.password && errors.password}</small>
            <br />
            <div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Submit
           </button>
              <button onClick={e => router.push("/")} className="btn btn-dark float-right" disabled={isSubmitting}>
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