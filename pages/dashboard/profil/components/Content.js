import dataUser from "../../../../mock/user.json";
import store from "store";
import { useEffect, useState } from "react";
import { UserAPI } from "../../../api/UserAPI";
import { USER } from "../../../../utils/constants";

export default function Content() {
  const [users, setUsers] = useState({
    data: null,
  });
  async function getData() {
    const rUser = await UserAPI.getListUser();
    setUsers({
      data: rUser.data,
    });
  }
  useEffect(() => {
    if (store.get(USER).role === "superadmin") getData();
  }, []);
  // console.log(store.get(USER).role)
  return (
    <div className="card mb-4">
      <div className="card-body bg-light">
        <div className="row">
          <div className="col-xl-4">
            <img
              src="/static/assets/img/avataaars.svg"
              className="w-100 float-right"
            ></img>
          </div>
          <div className="col-xl-8">
            {store.get(USER).role === "superadmin" ? (
              <div>
                {users.data &&
                  users.data
                    .filter((row) => row.id_admin === store.get(USER).id_admin)
                    .map((row) => (
                      <div>
                        <b style={{ fontSize: 40 }}>{row.nama_admin}</b>
                        <p className="text-muted" style={{ fontSize: 18 }}>
                          {row.alamat}{" "}
                          <i
                            class="fa fa-map-marker icon-onprofil"
                            style={{ width: 16 }}
                          ></i>
                        </p>
                        <div>
                          <i
                            class="fa fa-user icon-onprofil"
                            style={{ width: 16 }}
                          ></i>{" "}
                          {row.username}
                        </div>
                        <div>
                          <i
                            class="fa fa-phone icon-onprofil"
                            style={{ width: 16 }}
                          ></i>{" "}
                          {row.no_hp}
                        </div>
                        <div>Sebagai: {row.role}</div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div>
                          <p className="float-right">
                            ID User: <b>{row.id_admin}</b>
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            ) : (
              <div>
                <div>
                  <b style={{ fontSize: 40 }}>{store.get(USER).nama_admin}</b>
                  <p className="text-muted" style={{ fontSize: 18 }}>
                    {store.get(USER).alamat}{" "}
                    <i
                      class="fa fa-map-marker icon-onprofil"
                      style={{ width: 16 }}
                    ></i>
                  </p>
                  <div>
                    <i
                      class="fa fa-user icon-onprofil"
                      style={{ width: 16 }}
                    ></i>{" "}
                    {store.get(USER).username}
                  </div>
                  <div>
                    <i
                      class="fa fa-phone icon-onprofil"
                      style={{ width: 16 }}
                    ></i>{" "}
                    {store.get(USER).no_hp}
                  </div>
                  <div>Sebagai: {store.get(USER).role}</div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div>
                    <p className="float-right">
                      ID User: <b>{store.get(USER).id_admin}</b>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
