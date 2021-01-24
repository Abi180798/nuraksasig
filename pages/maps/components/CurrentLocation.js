import React, { useEffect } from "react";
import { geolocated } from "react-geolocated";

const CurrentLocation = (props) => {
    return !props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !props.isGeolocationEnabled ? (
        <div >Geolocation is not enabled</div>
    ) : props.coords ? (
        <div><button className="btn btn-primary w-100" type="button"
        onClick={e=>props.getLocation({lat:props.coords.latitude,lng:props.coords.longitude})}>
            Current Location</button><div><small>Location: {props.coords.latitude}, {props.coords.longitude}</small></div></div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(CurrentLocation);