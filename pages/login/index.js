import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { AuthAPI } from '../api/AuthAPI'
import FormLogin from './layouts/FormLogin'

export default function Login() {
  useEffect(()=>{
    if(AuthAPI.isAuthenticated()){
      Router.replace(`/dashboard`)
    }
  },[])
  return (
    <div>
      <Head>
        <title>Login-TAHURA NURAKSA</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="page-top">
        <section className="page-section bg-dark text-white vh-100">
          <div className="justify-content-center">
            <div className="text-center">
              <h2 className="mt-0">Login</h2>
              <hr className="divider my-4" />
            </div>
          </div>
          <div className="container-login">
            <div className="card card-login">
              <div className="card-body m-3">
                <FormLogin />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}