import React,{useState,useEffect} from 'react'
import moment from 'moment'
import {EventAPI} from '../api/EventAPI'
import {getDateTimeArrayIndo} from '../../utils/convert'
import fconfig from '../../config/fconfig'

const conf = fconfig.storage()

export default function Event() {
  const [state, setState] = useState({
    length: 6
  })
  const [events,setEvents] = useState({
    length:6,
    data:null,
    url:null
  })
  async function getData() {
    const r = await EventAPI.getListEvent()
    let resultingArr = []
    try{
      const arr = r.data.map((row)=>row.gambar_event)
      var i;
      for(i=0;i<arr.length;i++){
        const d = await conf.ref("images-event").child(arr[i]).getDownloadURL()
        resultingArr.push(d)
      }
    }catch(err){
      console.log(err)
    }
    setEvents({
      data:r.data,
      url:resultingArr
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
              <a className="portfolio-box" href={row.gambar_event !== "" ? events.url[index] : "../../static/assets/img/image-not-found.png"} target="_blank">
                <img className="img-fluid" src={row.gambar_event !== "" ? events.url[index] : "../../static/assets/img/image-not-found.png"} alt="" style={{height:300,width:"100%"}}/>
                <div className="portfolio-box-caption">
                  <div className="project-category text-white-50">{row.judul_event}</div>
            <div className="project-name">{row.deskripsi_event}<br/>{getDateTimeArrayIndo(row.tanggal_event)}</div>
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
