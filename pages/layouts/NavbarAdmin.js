import React,{useState,useEffect} from 'react'
import {useMediaQuery} from 'react-responsive'
import Link from 'next/link'
import store from 'store'
import { TOKEN } from '../../utils/constants'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Loading from '../utils/Loading'

export default function NavbarAdmin(){
    const router = useRouter()
    const isTabletOrMobile = useMediaQuery({ maxWidth: 991 })
    const [state,setState] = useState({
        loading:false,
        statsNav: true,
        navStats: false,
    })
    const logout = async (id) => {
        Swal.fire({
          title: 'Apakah anda yakin?',
          text: "Anda akan keluar session ini!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, keluar!',
          cancelButtonText: 'Tidak',
        }).then(async (result) => {
          if (result.isConfirmed) {
            setState({...state,loading:true})
            store.remove(TOKEN)
            // // const response = await UserAPI.delWisata(id)
            // if (response.status === 500) {
            //   ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            // } else if (response.status_code === 401) {
            //   ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            // } else if (response.status_code === 200) {
            //   ShowNotify("Berhasil hapus user", notifyPosition.topCenter, notifyType.success, () => {
            //     Swal.fire(
            //       'Terhapus!',
            //       'Data kamu telah dihapus.',
            //       'success'
            //     ).then((result) => {
            //       router.reload()
            //     })
            //   })
            // }
            setState({...state,loading:false})
            router.reload()
          }
        })
      }
    useEffect(() => {
        const toggle = document.getElementById("sidenavAccordion")
        const btn_toggle = document.getElementById("sidebarToggle")
        const side_transform = document.getElementById("layoutSidenav_nav")
        const content_margin = document.getElementById("layoutSidenav_content")
        const dropd = document.getElementById("dropd-nav")
        const dropds = document.getElementById("dropd-navs")
        if(state.statsNav===false&&isTabletOrMobile===true){
            toggle.classList.remove("show")
            btn_toggle.classList.remove("collapsed")
            content_margin.style.marginLeft = "-225px"
            side_transform.style.transform = "translateX(0)"
        }else if(state.statsNav===true&&isTabletOrMobile===false){
            toggle.classList.add("show")
            btn_toggle.classList.add("collapsed")
            content_margin.style.marginLeft = "0px"
        }else if(state.statsNav===false&&isTabletOrMobile===false){
            toggle.classList.remove("show")
            btn_toggle.classList.remove("collapsed")
            content_margin.style.marginLeft = "-225px"
            side_transform.style.transform = "translateX(0)"
        }else if(state.statsNav===true&&isTabletOrMobile===true){
            toggle.classList.add("show")
            btn_toggle.classList.add("collapsed")
            content_margin.style.marginLeft = "-225px"
            side_transform.style.transform = "translateX(-225)"
        }
        if(state.navStats===true){
            dropd.classList.add("show")
            dropds.classList.add("show")
        }else{
            dropd.classList.remove("show")
            dropds.classList.remove("show")
        }
        // console.log("navstat",state.navStats)
        // console.log("ismo",isTabletOrMobile)
    }, [state.statsNav,state.navStats,isTabletOrMobile])
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link href="/dashboard">
            <a className="navbar-brand">TAHURA Nuraksa</a>
            </Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" 
            onClick={e=>setState({...state,statsNav:!state.statsNav})}>
                <i className="fas fa-bars white"></i></button>
            <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                {/* <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button"><i className="fas fa-search white"></i></button>
                    </div>
                </div> */}
            </form>
            <ul className="navbar-nav ml-auto ml-md-0">
                <li className="nav-item dropdown" id="dropd-nav">
                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    onClick={e=>setState({...state,navStats:!state.navStats})}>
                        <i className="fas fa-user fa-fw white"></i></a>
                    <div className="dropdown-menu dropdown-menu-right" id="dropd-navs" aria-labelledby="userDropdown">
                        {/* <a className="dropdown-item" href="#">Settings</a> */}
                        <Link href="/">
                        <a className="dropdown-item">Landing Page</a>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={e=>logout()}>Logout</a>
                    </div>
                </li>
            </ul>
            {state.loading&&<Loading/>}
        </nav>
    )
}