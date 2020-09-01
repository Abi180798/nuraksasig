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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
        <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossOrigin="anonymous"></script>
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
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossOrigin="anonymous"></script>
      </main>
    </div>

  )
}