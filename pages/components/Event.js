import React,{useState,useEffect} from 'react'
import axios from 'axios'
import EventAPI from '../api/EventAPI'

export default function Event() {
  const [state, setState] = useState({
    length: 6
  })
  const [events,setEvents] = useState({
    length:6,
    data:null
  })
  async function getData() {
    const r = await axios.get("https://tahuraevent.herokuapp.com/event/getall")
    setEvents({
      data:r.data
    })
  }
  useEffect(() => {
    getData()
  }, [])
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
            {events.data&&events.data.event.slice(0,state.length).map((r)=>console.log(r))}
            {events.data&&events.data.event.slice(0,state.length).map((row)=>(
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="../static/assets/img/portfolio/fullsize/1.jpg">
                <img className="img-fluid" src="../static/assets/img/portfolio/thumbnails/1.jpg" alt="" />
                <div className="portfolio-box-caption">
                  <div className="project-category text-white-50">{row.name}</div>
                  <div className="project-name">{row.kota}</div>
                </div>
              </a>
            </div>
            ))}
          </div>
        </div>
      </div>
      {events.data&&events.data.event.length >= 6 &&
        <div className="text-center bg-dark">
          <a className="btn btn-light btn-xl mt-4 mb-4"
          onClick={e => setState({ length: events.data&&events.data.event.length === state.length ? 6 : events.data&&events.data.event.length })}>
            {events.data&&events.data.event.length === state.length ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
            </a>
        </div>
      }
    </div>
  )
}
