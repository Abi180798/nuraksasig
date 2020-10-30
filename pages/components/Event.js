import React,{useState,useEffect} from 'react'
import moment from 'moment'
import {EventAPI} from '../api/EventAPI'
import {Convert} from '../utils/convert'

export default function Event() {
  const [state, setState] = useState({
    length: 6
  })
  const [events,setEvents] = useState({
    length:6,
    data:null
  })
  async function getData() {
    const r = await EventAPI.getListEvent()
    setEvents({
      data:r.data
    })
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(events)
  return (
    <div>
      <section className="page-section bg-secondary text-white">
        <div className="container text-center">
          <h2 className="mb-4">List of Event</h2>
          <a className="btn btn-light btn-xl" href="#portfolio">See our Event!</a>
        </div>
      </section>
      <div id="portfolio">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            {events.data&&events.data.slice(0,state.length).map((row,index)=>(
            <div className="col-lg-4 col-sm-6" key={index}>
              <a className="portfolio-box" href="../static/assets/img/portfolio/fullsize/1.jpg">
                <img className="img-fluid" src="../static/assets/img/portfolio/thumbnails/1.jpg" alt="" />
                <div className="portfolio-box-caption">
                  <div className="project-category text-white-50">{row.judul_event}</div>
            <div className="project-name">{row.deskripsi_event}<br/>{Convert.getDateTimeArrayIndo(row.tanggal_event)}</div>
                </div>
              </a>
            </div>
            ))}
          </div>
        </div>
      </div>
      {events.data&&events.data.length >= 6 &&
        <div className="text-center bg-dark">
          <a className="btn btn-light btn-xl mt-4 mb-4"
          onClick={e => setState({ length: events.data&&events.data.length === state.length ? 6 : events.data&&events.data.length })}>
            {events.data&&events.data.length === state.length ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
            </a>
        </div>
      }
    </div>
  )
}
