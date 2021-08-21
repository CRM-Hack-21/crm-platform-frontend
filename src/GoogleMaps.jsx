import React, { ReactChild, ReactChildren, ReactNode } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14} style={{ width: "100%", position: "relative", height: "100%"}} >
  
          {/* <Marker onClick={this.onMarkerClick}
                  name={'Current location'} /> */}
  
          {/* <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow> */}
        </Map>
      );
    }
  }
  
export default GoogleApiWrapper({
    apiKey: ("AIzaSyAS6kNfzF18xLoGmW8bNpr_MCN1KRUoY_A")
})(MapContainer)