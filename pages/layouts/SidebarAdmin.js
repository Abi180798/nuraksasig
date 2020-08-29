import Link from 'next/link'

export default function SidebarAdmin() {
    return(
        <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark collapse navbar-collapse" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link href="/dashboard">
                            <a className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Manajemen Data
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link href="/dashboard/wisata">
                                    <a className="nav-link">Wisata</a>
                                    </Link>
                                    <Link href="/dashboard/event">
                                    <a className="nav-link">Event</a>
                                    </Link>
                                    <Link href="/dashboard/user">
                                    <a className="nav-link">User</a>
                                    </Link>
                                </nav>
                            </div>
                            <Link href="/dashboard/profil">
                            <a className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Lihat Profil
                            </a>
                            </Link>
                            <Link href="/dashboard/tentang">
                            <a className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tentang
                            </a>
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Admin-TAHURA Nuraksa
                    </div>
                </nav>
            </div>
    )
}