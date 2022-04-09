/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import XYZ from 'ol/source/xyz';
import transform from 'ol/proj/transforms';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import proj from 'ol/proj';
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';

function MapView(props) {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [, setSelectedCoord] = useState();

  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  useEffect(() => {
    const rome = new Feature({
      geometry: new Point(proj.fromLonLat([12.5, 41.9])),
    });
    rome.setStyle(
      new Style({
        image: new Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          imgSize: [20, 20],
          src: 'https://picsum.photos/id/237/20/20',
        }),
      })
    );
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource({
        features: [rome],
      }),
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          }),
        }),

        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    });
    setMap(initialMap);
    setFeaturesLayer(initalFeaturesLayer);
  }, []);

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
    setSelectedCoord(transormedCoord);
  };
  return <div ref={mapElement} className="map-container" />;
}

export default MapView;
