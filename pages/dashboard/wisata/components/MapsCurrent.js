import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  width: "92%",
  height: "70%",
};
export const MapsCurrent = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 528px)" });

  const [state, setState] = useState({
    initLocation: {
      lat: -8.519655,
      lng: 116.283235,
    },
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedPin: props.editValue
      ? props.editValue
      : {
          lat: -8.519655,
          lng: 116.283235,
        },
  });
  function onMarkerClick(propsed, marker, e) {
    props.markerClicked(propsed.position);
    setState({
      selectedPlace: propsed,
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPin: propsed.position,
    });
  }
  function onDragend(t, map, coord) {
    const r = {
      lat: coord.latLng.lat(),
      lng: coord.latLng.lng(),
    };
    props.markerClicked(r);
    setState({ ...state, selectedPin: r });
  }
  function onMapClicked(props) {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  // console.log("data", props.dataWisata);
  // console.log("url", props.dataWisataUrl);
  console.log("pin", state.selectedPin);
  // console.log("cloc", props.location);
  function handleCurrent(value) {
    setState({
      ...state,
      selectedPin: value,
    });
    props.getLocation(value);
    props.markerClicked(value);
  }
  useEffect(() => {
    props.getInitLocation(state.initLocation);
  }, []);
  useEffect(() => {
    if (props.location) {
      handleCurrent(props.location);
    }
  }, [props.location]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Map
        google={props.google}
        zoom={18}
        initialCenter={state.selectedPin}
        center={state.selectedPin}
        containerStyle={{
          width: "92%",
          height: "100%",
        }}
        onClick={onMapClicked}
      >
        {props.dataWisata &&
          props.dataWisata.map((row, index) => (
            <Marker
              draggable={true}
              onDragend={onDragend}
              onClick={onMarkerClick}
              key={index}
              name={
                <div>
                  <div style={{ textAlign: "center" }}>
                    <img
                      style={{ height: 150, width: 150 }}
                      src={
                        row.gambar_wisata !== ""
                          ? props.dataWisataUrl[index]
                          : "../../../static/assets/img/imgnotfound.png"
                      }
                    ></img>
                    <br />
                  </div>
                  <b>Nama Wisata: {row.nama_wisata}</b>
                  <br />
                  <b>Alamat: {row.alamat_wisata}</b>
                  <br />
                  <b>Latitude: {row.latitude}</b>
                  <br />
                  <b>Longitude: {row.longitude}</b>
                </div>
              }
              position={{
                lat: row.latitude,
                lng: row.longitude,
              }}
            />
          ))}
        {props.location && (
          <Marker
            draggable={true}
            onDragend={onDragend}
            onClick={onMarkerClick}
            name={<div>Current Location</div>}
            position={props.location}
          ></Marker>
        )}
        <InfoWindow
          marker={state.activeMarker}
          visible={state.showingInfoWindow}
        >
          <b>{state.selectedPlace && state.selectedPlace.name}</b>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBBKeWrZY5AbyGGijLMsjhDuiCUs4Mww54",
})(MapsCurrent);
