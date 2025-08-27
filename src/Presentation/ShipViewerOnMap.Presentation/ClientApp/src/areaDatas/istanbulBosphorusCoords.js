import { fromLonLat } from 'ol/proj.js';

const istanbulBosphorusCoords = [
    [
        29.068560159745374,
        41.26144058517795
    ],
    [
        28.914199931721782,
        40.97550676712015
    ],
    [
        29.03845960579656,
        40.94472025462062
    ],
    [
        29.18794947697498,
        41.23296960183163
    ],
    [
        29.067590279484307,
        41.2614394025764
    ]
]

// İstanbul boğazı polygon
const TransformedIstanbulBosphorusCoords = [istanbulBosphorusCoords.map(coord => fromLonLat(coord))];

export default TransformedIstanbulBosphorusCoords;