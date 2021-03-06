import { useState,useEffect } from 'react'
import { WisataAPI } from '../api/WisataAPI'
import fconfig from '../../config/fconfig'

const conf = fconfig.storage()

const dataWisata = require('../../mock/wisata.json')

export default function Wisata() {
  const [state, setState] = useState({
    length: 6
  })
  const [wisatas,setWisatas] = useState({
    length:6,
    data:null,
    url:null
  })
  async function getData() {
    const r = await WisataAPI.getListWisata()
    let resultingArr = []
    try{
      const arr = r.data.map((row)=>row.gambar_wisata)
      var i;
      for(i=0;i<arr.length;i++){
        const d = await conf.ref("images").child(arr[i]).getDownloadURL()
        resultingArr.push(d)
      }
    }catch(err){
      console.log(err)
    }
    setWisatas({
      data:r.data,
      url:resultingArr
    })
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(wisatas)
  return (
    <div>
      <section className="page-section bg-primary" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">We've got what you need!</h2>
              <hr className="divider light my-4" />
              <p className="text-white-50 mb-4">Come visit us on our trip like natural tourism and you will got such have a good vacation. Trust It!</p>
              <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section" id="services">
        <div className="container">
          <h2 className="text-center mt-0">List Of Trip</h2>
          <hr className="divider my-4" />
          <div className="row">
            {wisatas.data&&wisatas.data.slice(0, state.length).map((arr,index) => (
              <div className="col-md-6 col-lg-4 mb-5" key={arr.id_wisata}>
                <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                  </div>
                  <img className="img-fluid" src={arr.gambar_wisata !== "" ? wisatas.url[index] : "../../static/assets/img/imgnotfound.png"} alt="" style={{height:250}} />
                </div>
                <b>{arr.nama_wisata}</b>
              </div>
            ))}
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 text-center">
                  {wisatas.data&&wisatas.data.length >= 6 &&
                    <a className="btn btn-warning btn-xl js-scroll-trigger"
                      onClick={e => setState({ length: wisatas.data.length === state.length ? 6 : wisatas.data.length })}>
                      {wisatas.data.length === state.length ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}