import Head from 'next/head'
import withPrivateRoute from '../utils/withPrivateRoute'
import NavbarAdmin from '../layouts/NavbarAdmin'
import SidebarAdmin from '../layouts/SidebarAdmin'
import Content from './components/Content'
import FooterAdmin from '../layouts/FooterAdmin'
import Layout from '../layouts/Layout'
function Dashboard(){
    return(
        <Layout title="Dashboard">
            <Content/>
        </Layout>
    )
}

export default withPrivateRoute(Dashboard)