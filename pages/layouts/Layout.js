import Link from 'next/link'
import Head from 'next/head'
import NavbarAdmin from './NavbarAdmin'
import SidebarAdmin from './SidebarAdmin'
import Content from '../dashboard/components/Content'
import FooterAdmin from './FooterAdmin'

export default function Layout({
  children,
  title = "",
}) {
  return (
    <div>
      <Head>
        <title>{title}-TAHURA NURAKSA</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="sb-nav-fixed">
        <NavbarAdmin />
        <div id="layoutSidenav">
          <SidebarAdmin title={title}/>
          <div id="layoutSidenav_content">
            {/* <Content/> */}
            {children}
            <FooterAdmin />
          </div>
        </div>        
      </main>
    </div>

  )
}