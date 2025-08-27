import { fromLonLat } from 'ol/proj.js';

const blackSeaTurkishCoastCoords = [
    [
        27.616440611923878,
        42.397119871413054
    ],
    [
        27.616440611923878,
        40.920640577375195
    ],
    [
        42.172066100958375,
        40.920640577375195
    ],
    [
        42.172066100958375,
        42.397119871413054
    ],
    [
        27.616440611923878,
        42.397119871413054
    ]
]

// İstanbul boğazı polygon
const TransformedBlackSeaTurkishCoastCoords = [blackSeaTurkishCoastCoords.map(coord => fromLonLat(coord))];

export default TransformedBlackSeaTurkishCoastCoords;