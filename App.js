import React from 'react';
import { MapView } from 'expo';

const polyline = [
  { latitude: 37.79, longitude: -122.44 },
  { latitude: 37.80, longitude: -122.44 },
  { latitude: 37.80, longitude: -122.45 },
  { latitude: 37.79, longitude: -122.45 },
]

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      markers: [
        {
          coordinate: { latitude: 37.79, longitude: -122.44 },
          title: 'TEST',
          description: 'A description...',
        },
      ]
    }
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.state.markers.map((marker, index) => (
          <MapView.Marker key={index} {...marker} />
        ))}

        <MapView.Polyline coordinates={polyline} />
      </MapView>
    );
  }
}
