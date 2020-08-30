import dataUser from '../../../../mock/user.json'
import store from 'store'

export default function Content() {
    return(
        <div className="card mb-4">
            <div className="card-body bg-light">
                <div className="row">
                  <div className="col-xl-8 text-right">
                    {dataUser.data.filter((row)=>row.token===store.get("token")).map((row)=>(
                      <div>
                        <p>ID User: <b>{row.id_user}</b></p>
                        <p>Username: <b>{row.username}</b></p>
                    <p>Nama Lengkap: <b style={{fontSize:30}}>{row.nama_lengkap}</b></p>
                    <p>Alamat: <b style={{fontSize:20}}>{row.alamat}</b></p>
                    <p>No Telepon: <b style={{fontSize:20}}>{row.no_hp}</b></p>
                    <br/><br/><br/>
                    <h6>Sebagai: {row.role}</h6>
                      </div>
                    ))}
                  </div>
                  <div className="col-xl-4">
                    <img src="https://i.ibb.co/KF8rpgY/defaultpp.png" className="w-100 float-right"></img>
                  </div>
                </div>
            </div>
        </div>
    )
}