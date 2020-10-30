import React, { useState, useEffect } from 'react'
import TahuraMaps from "./TahuraMaps";
import CurrentLocation from "./CurrentLocation"
import dataWisata from '../../../mock/wisata.json'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link';
import { WisataAPI } from '../../api/WisataAPI';

export default function Content() {
  const isMobile = useMediaQuery({ query: '(max-width: 530px)' })

  const [state, setState] = useState({
    cLocation: null,
    pLocation: null,
    dataFilter: null,
    tLocationLat: null,
    tLocationLng: null,
  })
  const [wisatas, setWisatas] = useState({
    length: 6,
    data: null
  })
  async function getData() {
    const r = await WisataAPI.getListWisata()
    setWisatas({
      data: r.data
    })
  }

  console.log(wisatas)
  function getLocation(value) {
    setState({
      ...state,
      cLocation: value
    })
  }
  function setSelected() {
    setState({
      ...state,
      pLocation: state.pLocation,
      dataFilter: wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0]
    })
  }
  console.log("coba",wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0])
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    // if(state.pLocation){
    //     setState({
    //         ...state,
    //     pLocation:dataWisata.data.filter((row)=>row.id_wisata===state.pLocation)[0]
    // })
    // }
    setSelected()
    if (state.dataFilter) {
      setState({
        ...state,
        tLocationLat: state.dataFilter && wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0].latitude,
        tLocationLng: state.dataFilter && wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0].latitude
      })
    }
  }, [state.cLocation, state.pLocation, state.dataFilter, state.tLocationLat, state.tLocationLng])
  console.log(state.dataFilter&&state.dataFilter)
  // console.log(dataWisata.data.filter((row)=>row.id_wisata===state.pLocation)[0])
  return (
    <header className="masthead">
      <div className="pl-5 pr-5">
        <div className="mt-5 card card-body" style={{ height: "80vh" }}>
          <div className="card-header">
            <b style={{ fontSize: 40 }}>Maps</b>
            <div className="float-right">

              <CurrentLocation getLocation={getLocation} location={state.cLocation} />
            </div>

            <div className={`float-right mr-3 ${isMobile ? `w-75` : `w-25`}`} >
              {wisatas.data &&
                <select className="form-control" value={state.pLocation} onChange={e => setState({ ...state, pLocation: e.currentTarget.value })}>
                  <option selected>Pilih Wisata</option>
                  {wisatas.data.map((row, index) => (
                    <option key={index} value={row.id_wisata}>{row.nama_wisata}</option>
                  ))}
                </select>
              }
            </div>
            <div className="float-right">
              {state.cLocation && state.dataFilter && state.tLocationLat && state.tLocationLng &&
                <Link href={`https://www.google.com/maps/dir/${state.cLocation.lat},${state.cLocation.lng}/${state.tLocationLat},${state.tLocationLng}/@${state.tLocationLat},${state.tLocationLng}/`}>
                  <a className="btn btn-success mr-3">Berangkat</a>
                </Link>
              }
              {/* {console.log("clo",state.cLocation&&state.cLocation)}
                        {console.log("plo",state.dataFilter&&state.dataFilter.location)}
                        {console.log("tlo",state.tLocation&&state.tLocation)} */}
            </div>
          </div>
          {  console.log("coba",wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0])
}
          <div className="card-body">
            <TahuraMaps cLocation={state.cLocation} pLocation={state.pLocation} 
            dataFilter={state.dataFilter && {lat:wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0].latitude, lng: wisatas.data && wisatas.data.filter((row) => row.id_wisata.toString() === state.pLocation)[0].longitude}} />
          </div>
        </div>
      </div>
    </header>
  )
}