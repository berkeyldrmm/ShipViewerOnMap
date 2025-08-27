import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import Overlay from 'ol/Overlay.js';
import VectorSource from 'ol/source/Vector.js';
import Icon from 'ol/style/Icon.js';
import Style from 'ol/style/Style.js';
import shipIcon from './assets/ship.svg';
import directionIcon from './assets/direction.svg';
import Polygon from 'ol/geom/Polygon';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import TransformedIstanbulBosphorusCoords from './areaDatas/istanbulBosphorusCoords.js';
import TransformedAegeanSeaCoords from './areaDatas/aegeanSeaCoords.js';
import TransformedBlackSeaCoords from './areaDatas/blackSeaCoords.js';
import TransformedAegeanSeaTurkishCoastCoords from './areaDatas/aegeanSeaTurkishCoastCoords.js';
import TransformedBlackSeaTurkishCoastCoords from './areaDatas/blackSeaTurkishCoastCoords.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat, get } from 'ol/proj.js';
import Function from './functions.js';

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM({
                wrapX: false
            }),
        }),
    ],
    view: new View({
        center: fromLonLat([29.0, 41.0]),
        zoom: 5,
        extent: get('EPSG:3857').getExtent()
    }),
});

//Ship Tracking

$(".collapsible").on("click", function () {
    Function.changeVisibility(this);
});

var istanbulBosphorusNotifications = [];

const bosphorusPolygon = new Feature({
    geometry: new Polygon(TransformedIstanbulBosphorusCoords),
});

bosphorusPolygon.setStyle(new Style({
    stroke: new Stroke({
        color: 'rgba(220, 53, 69, 1)',
        width: 2,
    }),
    fill: new Fill({
        color: 'rgba(220, 53, 69, 0.5)',
    }),
}));

const bosphorusPolygonLayer = new VectorLayer({
    source: new VectorSource({
        features: [bosphorusPolygon],
    }),
});

map.addLayer(bosphorusPolygonLayer);

const aegeanSeaPolygon = new Feature({
    geometry: new Polygon(TransformedAegeanSeaCoords),
});

aegeanSeaPolygon.setStyle(new Style({
    stroke: new Stroke({
        color: 'rgb(13, 110, 253, 1)',
        width: 2,
    }),
    fill: new Fill({
        color: 'rgb(13, 110, 253, 0.5)',
    }),
}));

const aegeanSeaPolygonLayer = new VectorLayer({
    source: new VectorSource({
        features: [aegeanSeaPolygon],
    }),
});

map.addLayer(aegeanSeaPolygonLayer);

const blackSeaPolygon = new Feature({
    geometry: new Polygon(TransformedBlackSeaCoords),
});

blackSeaPolygon.setStyle(new Style({
    stroke: new Stroke({
        color: 'rgb(255, 193, 7)',
        width: 2,
    }),
    fill: new Fill({
        color: 'rgb(255, 193, 7, 0.5)',
    }),
}));

const blackSeaPolygonLayer = new VectorLayer({
    source: new VectorSource({
        features: [blackSeaPolygon],
    }),
});

map.addLayer(blackSeaPolygonLayer);

const aegeanSeaTurkishCoastPolygon = new Feature({
    geometry: new Polygon(TransformedAegeanSeaTurkishCoastCoords),
});

const blackSeaTurkishCoastPolygon = new Feature({
    geometry: new Polygon(TransformedBlackSeaTurkishCoastCoords),
});

fetch("/api/ship/getall").then(res => res.json()).then(data => {
    if (data.success) {
        var ships = data.data;

        const shipFeatures = ships.map((v) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([v.lon, v.lat])),
                shipData: v,
            });
            return feature;
        });

        const shipSource = new VectorSource({ features: shipFeatures, wrapX: false });

        const shipLayer = new VectorLayer({
            source: shipSource,
            style: function (feature, resolution) {
                const v = feature.get('shipData');

                const zoom = map.getView().getZoom();

                let scaleX;
                let scaleY;

                const baseSvgSize = 60;
                
                let coloredSvg;
                if (zoom < 14) {
                    coloredSvg = directionIcon.replace(/fill='currentColor'/g, `fill='${Function.selectColor(v.shipType)}'`);
                    const { pixelLength, pixelWidth } = Function.getShipPixelSizeForDirection(v);
                    scaleX = pixelWidth / baseSvgSize;
                    scaleY = pixelLength / baseSvgSize;
                }
                else {
                    coloredSvg = shipIcon.replace(/fill='currentColor'/g, `fill='${Function.selectColor(v.shipType)}'`);
                    const { pixelLength, pixelWidth } = Function.getShipPixelSizeForShip(v, resolution);
                    scaleX = pixelWidth / baseSvgSize;
                    scaleY = pixelLength / baseSvgSize;
                }

                return new Style({
                    image: new Icon({
                        src: coloredSvg,
                        rotation: (v.heading * Math.PI) / 180,
                        rotateWithView: true,
                        scale: (zoom < 14 ? scaleY : [scaleX, scaleY])
                    }),
                });
            },
        });

        map.addLayer(shipLayer);

        const popup = document.getElementById('popup');
        const overlay = new Overlay({
            element: popup,
            positioning: 'center-right',
            stopEvent: false,
            offset: [0, 0]
        });
        map.addOverlay(overlay);

        map.on('singleclick', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);

            if (feature && feature.get('shipData')) {
                const ship = feature.get('shipData');

                fetch(`/api/ship/getbyid/${ship.id}`).then(res => res.json()).then(data => {
                    if (data.success) {

                        const selectedShip = data.data;
                        popup.innerHTML = `
                          <strong>${Function.makeCapitalize(selectedShip.shipName)}</strong><br>
                          <small>Type: ${Function.replaceUnderline(Function.makeCapitalize(selectedShip.shipType))}</small><br>
                          <small>Status: ${Function.makeCapitalize(selectedShip.status)}</small><br>
                          MMSI: ${Function.makeCapitalize(selectedShip.mmsi)}<br>
                          IMO: ${Function.makeCapitalize(selectedShip.imo)}
                        `;

                        overlay.setPositioning(Function.getShipScreenZone(feature, map));
                        overlay.setPosition(feature.getGeometry().getCoordinates());
                    }
                    else {
                        alert(data.message);
                    }
                })

            } else {
                overlay.setPosition(undefined);
            }
        });

        setInterval(() => {
            Function.updatePerFiveSeconds(shipSource, bosphorusPolygon, aegeanSeaPolygon, blackSeaPolygon, aegeanSeaTurkishCoastPolygon, blackSeaTurkishCoastPolygon, istanbulBosphorusNotifications);
        }, 5000)
    }
    else {
        alert("Error: " + data.message);
    }
});