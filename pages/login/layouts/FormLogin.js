import {Formik} from 'formik'
import { useRouter } from 'next/router'
import store from 'store'
export default function FormLogin(){
    const router = useRouter()
    return(
        <Formik
       initialValues={{ username: '', password: '' }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           if(values.username==="admin"&&values.password==="123"||values.username==="superadmin"&&values.password==="123"){
              if(values.username==="admin"&&values.password==="123"){
                store.set("token","admin")
              }else if(values.username==="superadmin"&&values.password==="123"){
                store.set("token","superadmin")
              }
               router.push('/dashboard')
           }else{
               alert("Username atau password anda salah!")
           }
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
           <br/>
           <label className="label-login">Password</label><br/>
           <input
           className="form-control input-login"
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           <small className="label-login-error">{errors.password && touched.password && errors.password}</small>
           <br/>
           <div>
           <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
             Submit
           </button>
           <button onClick={e=>router.push("/")} className="btn btn-dark float-right" disabled={isSubmitting}>
             Back
           </button>
           </div>
         </form>
       )}
     </Formik>
    )
}