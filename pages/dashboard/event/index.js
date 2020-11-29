import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layouts/Layout";
import ListEvent from "./components/ListEvent";
import { EventAPI } from "../../api/EventAPI";
import Loading from "../../utils/Loading";
import withPrivateRoute from "../../utils/withPrivateRoute";

function EventAdmin() {
  const [state, setState] = useState({
    loading: false,
  });
  const [events, setEvents] = useState({
    data: null,
  });
  async function getData() {
    setState({ ...state, loading: true });
    const r = await EventAPI.getListEvent();
    setEvents({
      data: r.data,
    });
    setState({ ...state, loading: false });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout title="Event">
      <main>
        <div className="container-fluid">
          <h1 className="mt-4">Daftar Event</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Manajemen Data</li>
            <li className="breadcrumb-item active" aria-current="page">
              Event
            </li>
          </ol>
          {events.data && <ListEvent events={events.data} getData={getData} />}
        </div>
      </main>
      {state.loading && <Loading />}
    </Layout>
  );
}

export default withPrivateRoute(EventAdmin);
