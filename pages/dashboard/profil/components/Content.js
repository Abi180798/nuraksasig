import dataUser from '../../../../mock/user.json'
import store from 'store'

export default function Content() {
    return(
        <div className="card mb-4">
            <div className="card-body bg-light">
                <div className="row">
                <div className="col-xl-4">
                    <img src="https://i.ibb.co/KF8rpgY/defaultpp.png" className="w-100 float-right"></img>
                  </div>
                  <div className="col-xl-8">
                    {dataUser.data.filter((row)=>row.token===store.get("token")).map((row)=>(
                      <div>
                      <b style={{fontSize:40}}>{row.nama_lengkap}
                      </b>
                    <p className="text-muted" style={{fontSize:18}}>{row.alamat}{' '}
                      <i class="fa fa-map-marker icon-onprofil"></i>
                    </p>
                    <div><i class="fa fa-user icon-onprofil"></i>{' '}{row.username}</div>
                    <div><i class="fa fa-phone icon-onprofil"></i>{' '}{row.no_hp}</div>
                    <div>Sebagai: {row.role}</div>
                    <br/><br/><br/><br/><br/>
                    <div>
                    <p  className="float-right">ID User: <b>{row.id_user}</b></p>
                    </div>
                      </div>
                    ))}
                  </div>
                  
                </div>
            </div>
        </div>
    )
}