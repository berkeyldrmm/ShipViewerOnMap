import { fromLonLat } from 'ol/proj.js';

const aegeanSeaTurkishCoastCoords = [
    [
        25.35814341653142,
        40.90182920068108
    ],
    [
        26.702321864210717,
        40.94894721305454
    ],
    [
        27.80008151964273,
        36.43273409925271
    ],
    [
        26.8404681836422,
        36.35266049891278
    ],
    [
        25.78888721690521,
        38.14890011985804
    ],
    [
        25.307502501390104,
        40.96839247712526
    ]
]

// İstanbul boğazı polygon
const TransformedAegeanSeaTurkishCoastCoords = [aegeanSeaTurkishCoastCoords.map(coord => fromLonLat(coord))];

export default TransformedAegeanSeaTurkishCoastCoords;