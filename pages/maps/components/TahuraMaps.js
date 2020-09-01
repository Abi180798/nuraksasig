import React, { useState } from 'react'
import {useMediaQuery} from 'react-responsive'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const dataWisata = require("../../../mock/wisata.json")

const containerStyle = {
  width: '92%',
  height: '70%'
}
export const TahuraMaps = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 528px)' })

  const [state, setState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });
  function onMarkerClick(props, marker, e) {
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  function onMapClicked(props) {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
    <Map google={props.google} zoom={18}
      initialCenter={{
        lat: -8.519655,
        lng: 116.283235,
      }}
      center={props.dataFilter?props.dataFilter:props.cLocation?props.cLocation:props.pLocation&&props.pLocation}
      containerStyle={
        {
          width: '92%',
          height: isMobile?'55%':'70%'
        }
      }
      onClick={onMapClicked}
    >
      {dataWisata.data.map((row,index) => (
        <Marker onClick={onMarkerClick} key={index}
          name={<div>
            <div style={{textAlign:"center"}}>
              <img style={{height:150,width:150}} src='https://i.ibb.co/pWm832K/airterjunsegenter1.jpg'></img><br/>
              </div>
            <b>Nama Wisata: {row.nama_wisata}</b><br />
            <b>Alamat: {row.alamat_wisata}</b><br />
            <b>Latitude: {row.location.lat}</b><br />
            <b>Longitude: {row.location.lng}</b>
          </div>} position={{
            lat: row.location.lat,
            lng: row.location.lng
          }} />
      ))}
      {props.cLocation&&
      <Marker onClick={onMarkerClick} name={
        <div>Current Location</div>
      }
      position={props.cLocation}></Marker>
      }
      <InfoWindow marker={state.activeMarker}
        visible={state.showingInfoWindow}>
        <b>{state.selectedPlace && state.selectedPlace.name}</b>
      </InfoWindow>
    </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBBKeWrZY5AbyGGijLMsjhDuiCUs4Mww54")
})(TahuraMaps)