import React from 'react';
import { MapView } from 'expo';

import site from './site.json';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      markers: site.Lines.reduce((acc, lines) => {
        lines.points.filter(point => point.station).forEach(point => {
          acc.push({
            coordinate: { latitude: point.lat, longitude: point.lng },
            title: point.station,
          })
        })
        return acc
      }, []),
      polylines: site.Lines.map(lines => (
        lines.points.map(point => ({
          latitude: point.lat,
          longitude: point.lng,
        }))
      )),
    }
  }

  initialRegion() {
    const MARGIN = 1.2
    return {
      latitude: site.Map.origin.lat,
      longitude: site.Map.origin.lng,
      latitudeDelta: MARGIN * Math.abs(site.bounds.max.lat - site.bounds.min.lat),
      longitudeDelta: MARGIN * Math.abs(site.bounds.max.lng - site.bounds.min.lng),
    }
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.initialRegion()}
      >
        {this.state.polylines.map((polyline, index) => (
          <MapView.Polyline key={index} coordinates={polyline} strokeWidth={5} strokeColor="#1396A5" />
        ))}

        {this.state.markers.map((marker, index) => (
          <MapView.Marker key={index} {...marker} />
        ))}
      </MapView>
    );
  }
}
