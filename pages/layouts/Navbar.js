import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import store from 'store'

export default function Navbar() {
    const [state, setState] = useState({
        statsNav: false
    })
    useEffect(() => {
        const toggle = document.getElementById("navbarResponsive")
        const btn_toggle = document.getElementById("btn-toggle")
        if (state.statsNav === false) {
            toggle.classList.remove("show")
            btn_toggle.classList.remove("collapsed")
        } else if (state.statsNav === true) {
            toggle.classList.add("show")
            btn_toggle.classList.add("collapsed")
        }
    }, [state.statsNav])
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container">
                <Link href="/">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">TAHURA Nuraksa</a>
                </Link>
                <button className="navbar-toggler navbar-toggler-right collapsed" id="btn-toggle" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded={state.statsNav === false ? false : true} aria-label="Toggle navigation"
                    onClick={e => setState({ ...state, statsNav: !state.statsNav })}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <Link href="/maps">
                        <li className="nav-item"><a className="nav-link js-scroll-trigger">Maps</a></li>
                        </Link>
                        <Link href="/aboutus">
                        <li className="nav-item"><a className="nav-link js-scroll-trigger">About Us</a></li>
                        </Link>
                        {store.get("token") ?
                            <li className="nav-item"><Link href="/dashboard"><a className="nav-link js-scroll-trigger">Dashboard</a></Link></li>
                            :
                            <li className="nav-item"><Link href="/login"><a className="nav-link js-scroll-trigger">Login</a></Link></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}