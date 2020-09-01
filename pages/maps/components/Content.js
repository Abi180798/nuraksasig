import React,{useState,useEffect} from 'react'
import TahuraMaps from "./TahuraMaps";
import CurrentLocation from "./CurrentLocation"
import dataWisata from '../../../mock/wisata.json'
import {useMediaQuery} from 'react-responsive'
import Link from 'next/link';

export default function Content(){
    const [state, setState] = useState({
        cLocation:null,
        pLocation:null,
        dataFilter:null,
        tLocation:null
    })
    function getLocation(value){
        setState({
            ...state,
            cLocation:value
        })
    }
    function setSelected(){
        setState({
            ...state,
            pLocation:state.pLocation,
            dataFilter:dataWisata.data&&dataWisata.data.filter((row)=>row.id_wisata.toString()===state.pLocation)[0]
        })
    }
    useEffect(()=>{
        // if(state.pLocation){
        //     setState({
        //         ...state,
        //     pLocation:dataWisata.data.filter((row)=>row.id_wisata===state.pLocation)[0]
        // })
        // }
        setSelected()
            if(state.dataFilter){
                setState({
                    ...state,
                    tLocation:state.dataFilter&&state.dataFilter.location
                })
            }
        },[state.cLocation,state.pLocation,state.dataFilter,state.tLocation])
    // console.log(dataWisata.data.filter((row)=>row.id_wisata===state.pLocation)[0])
    return(
        <header className="masthead">
            <div className="pl-5 pr-5">
                <div className="mt-5 card card-body" style={{height:"80vh"}}>
                    <div className="card-header">
                    <b style={{fontSize:40}}>Maps</b>
                    <div className="float-right">
                
                <CurrentLocation getLocation={getLocation} location={state.cLocation}/>
                    </div>
                    
                    <div className="float-right mr-3 w-50">
                        {dataWisata&&
                        <select className="form-control" value={state.pLocation} onChange={e=>setState({...state,pLocation:e.currentTarget.value})}>
                            <option selected>Pilih Wisata</option>
                            {dataWisata.data.map((row,index)=>(
                                <option key={index} value={row.id_wisata}>{row.nama_wisata}</option>
                            ))}
                        </select>
                        }
                    </div>
                    <div className="float-right">
                        {state.cLocation&&state.dataFilter&&state.tLocation&&
                        <Link href={`https://www.google.com/maps/dir/${state.cLocation.lat},${state.cLocation.lng}/${state.tLocation.lat},${state.tLocation.lng}/@${state.tLocation.lat},${state.tLocation.lng}/`}>
                        <a className="btn btn-success mr-3">Berangkat</a>
                        </Link>
                        }
                        {/* {console.log("clo",state.cLocation&&state.cLocation)}
                        {console.log("plo",state.dataFilter&&state.dataFilter.location)}
                        {console.log("tlo",state.tLocation&&state.tLocation)} */}
                    </div>
                    </div>
                    <div className="card-body">
                <TahuraMaps cLocation={state.cLocation} pLocation={state.pLocation} dataFilter={state.dataFilter&&state.dataFilter.location}/>
                    </div>
                </div>
            </div>
            </header>
    )
}