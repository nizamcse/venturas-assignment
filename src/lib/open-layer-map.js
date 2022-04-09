import 'ol/ol.css';
import Feature from 'ol/feature';
import Map from 'ol/map';
import Point from 'ol/geom/point';
import TileJSON from 'ol/source/tilejson';
import VectorSource from 'ol/source/vector';
import View from 'ol/view';
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';

import { Tile as TileLayer, Vector as VectorLayer } from 'openlayers';
import proj from 'ol/proj';

const rome = new Feature({
  geometry: new Point(proj.fromLonLat([12.5, 41.9])),
});

const london = new Feature({
  geometry: new Point(proj.fromLonLat([-0.12755, 51.507222])),
});

const madrid = new Feature({
  geometry: new Point(proj.fromLonLat([-3.683333, 40.4])),
});
const paris = new Feature({
  geometry: new Point(proj.fromLonLat([2.353, 48.8566])),
});
const berlin = new Feature({
  geometry: new Point(proj.fromLonLat([13.3884, 52.5169])),
});

rome.setStyle(
  new Style({
    image: new Icon({
      color: '#BADA55',
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/square.svg',
    }),
  })
);

london.setStyle(
  new Style({
    image: new Icon({
      color: 'rgba(255, 0, 0, .5)',
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',
      scale: 0.2,
    }),
  })
);

madrid.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',
      scale: 0.2,
    }),
  })
);

paris.setStyle(
  new Style({
    image: new Icon({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/dot.svg',
    }),
  })
);

berlin.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/dot.svg',
    }),
  })
);
const vectorSource = new VectorSource({
  features: [rome, london, madrid, paris, berlin],
});

const vectorLayer = () =>
  VectorLayer({
    source: vectorSource,
  });

const rasterLayer = () =>
  TileLayer({
    source: new TileJSON({
      url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
      crossOrigin: '',
    }),
  });

export function initOpenLayer(elem) {
  return new Map({
    layers: [rasterLayer, vectorLayer],
    target: elem,
    view: new View({
      center: proj.fromLonLat([2.896372, 44.6024]),
      zoom: 3,
    }),
  });
}
