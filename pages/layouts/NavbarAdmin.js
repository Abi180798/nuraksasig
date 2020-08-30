import React,{useState,useEffect} from 'react'
import {useMediaQuery} from 'react-responsive'
import Link from 'next/link'
import store from 'store'

export default function NavbarAdmin(){
    const isTabletOrMobile = useMediaQuery({ maxWidth: 991 })
    const [state,setState] = useState({
        statsNav: true
    })
    useEffect(() => {
        const toggle = document.getElementById("sidenavAccordion")
        const btn_toggle = document.getElementById("sidebarToggle")
        const side_transform = document.getElementById("layoutSidenav_nav")
        const content_margin = document.getElementById("layoutSidenav_content")
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
        // console.log("stat",state.statsNav)
        // console.log("ismo",isTabletOrMobile)
    }, [state.statsNav,isTabletOrMobile])
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="index.html">TAHURA Nuraksa</a>
            <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" 
            onClick={e=>setState({...state,statsNav:!state.statsNav})}>
                <i className="fas fa-bars"></i></button>
            <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
            <ul className="navbar-nav ml-auto ml-md-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        {/* <a className="dropdown-item" href="#">Settings</a>
                        <a className="dropdown-item" href="#">Activity Log</a>
                        <div className="dropdown-divider"></div> */}
                        <Link href="/">
                        <a className="dropdown-item" onClick={e=>store.remove("token")}>Logout</a>
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
    )
}