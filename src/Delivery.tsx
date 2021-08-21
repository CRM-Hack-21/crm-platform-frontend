import React, { ReactChild, ReactChildren, ReactNode } from "react";
import { useHistory } from "react-router";
import styles from "./Delivery.module.css";
import map_marker from "./icons/map-marker.svg";
import GoogleApiWrapper from "./GoogleMaps";

export function DeliveryField() {

    const history = useHistory();

    const openMap = () => {
        
        history.push(history.location.pathname + "/map-delivery");
    };

    return (
        <div className={styles.DeliveryField}>
            <input type="text" placeholder="Укажите адрес" />
            <button className={styles.Marker} onClick={openMap}>
                <img src={map_marker} alt="Select on Map" />
            </button>
        </div>
    )
}

export function OnMapDelivery() {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className={styles.MapDelivery}>
            <button onClick={goBack}>Go back</button>
            <GoogleApiWrapper />
        </div>
    )
}
