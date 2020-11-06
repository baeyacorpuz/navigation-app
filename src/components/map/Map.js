/*global google*/
import React, { useState } from 'react';
import { postMockApi, getMockApi } from '../../apis/api';
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

import Header from '../header/Header'
import { toast } from 'react-toastify';


const DirectionsComponent = compose(
  withProps(props => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`,
    loadingElement: <div style={{ height: `400px` }} />,
    containerElement: <div style={{ width: `100%` }} />,
    mapElement: <div style={{ height: `100vh`, width: `100%` }} />,
  })),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      // DirectionsService.route({
      //   origin: new google.maps.LatLng(22.372081, 114.107877),
      //   destination: new google.maps.LatLng(22.284419, 114.159510),
      //   travelMode: google.maps.TravelMode.DRIVING,
      // }, (result, status) => {
      //   if (status === google.maps.DirectionsStatus.OK) {
      //     this.setState({
      //       directions: { ...result },
      //       markers: true
      //     })
      //   } else {
      //     console.error(`error fetching directions ${result}`);
      //   }
      // });
    }
  }),
  lifecycle({
    componentDidUpdate() {
      const DirectionsService = new google.maps.DirectionsService();
      const path = this.props.data.path
      if (path !== undefined) {
        DirectionsService.route({
          origin: new google.maps.LatLng(path[0][0], path[0][1]),
          destination: new google.maps.LatLng(path[1][0], path[1][1]),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: { ...result },
              markers: true
            })
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    }
  })
)(props =>
  <GoogleMap defaultZoom={3}>
    {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
  </GoogleMap>
);

const Map = () => {
  const [initialValues, setInitialValues] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const onSubmit = async (values) => {
    setErrorMsg('')
    setInitialValues('')

    const token = await postMockApi(values);

    if (token.status === 200) {
      const apiResponse = await getMockApi(token.data.token)
      if (apiResponse.data.status === 'success') {
        setInitialValues(apiResponse.data)
      } else if (apiResponse.data.status === 'failure') {
        setErrorMsg(apiResponse.data)
      } else if (apiResponse.data) {
        setErrorMsg(apiResponse.data)
      }
    } else if (token.status === 500) {
      toast.error('Error in fetching data')
    }
  }


  return (
    <div id="map">
      <Header onSubmit={onSubmit} result={initialValues} errorMsg={errorMsg} />
      <DirectionsComponent
        data={initialValues}
      />
    </div>
  );
}

export default Map;