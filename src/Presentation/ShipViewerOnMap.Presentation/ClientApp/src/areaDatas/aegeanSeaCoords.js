import { fromLonLat } from 'ol/proj.js';

const aegeanSeaCoords = [
    [
        26.280427846428495,
        41.397994842469615
    ],
    [
        28.76890495578749,
        35.904266417298345
    ],
    [
        25.951957546789117,
        34.982930226168165
    ],
    [
        22.18711479301311,
        40.55125828483068
    ],
    [
        26.297053727174273,
        41.42264005612557
    ]
]

// İstanbul boğazı polygon
const TransformedAegeanSeaCoords = [aegeanSeaCoords.map(coord => fromLonLat(coord))];

export default TransformedAegeanSeaCoords;