import Point from 'ol/geom/Point.js';
import { fromLonLat, get, toLonLat } from 'ol/proj.js';

const Function = {
    haversineDistance: function (lat1, lon1, lat2, lon2) {
        const R = 6371e3; 
        const toRad = deg => deg * Math.PI / 180;

        const φ1 = toRad(lat1), φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    },
    showCollisionNotification: function(idA, nameA, idB, nameB, distance, notifications) {
        if (Notification.permission === "granted") {
            const timestamp = new Date().toLocaleTimeString();

            const notification = {
                idA,
                nameA,
                idB,
                nameB,
                distance,
                timestamp
            };

            notifications.unshift(notification);

            //new Notification("Warning: Ships are getting closer.", {
            //    body: this.generateCollisionMessage(nameA, nameB, distance)
            //});
        }
    },
    showSmugglingNotification: function (id, name, notifications, area) {
        if (Notification.permission === "granted") {
            const timestamp = new Date().toLocaleTimeString();

            const notification = {
                id,
                name,
                timestamp
            };

            notifications.unshift(notification);

            //new Notification(`Smuggling risk on ${area}`, {
            //    body: this.generateSmugglingMessage(name)
            //});
        }
    },
    renderCollisionNotification: function (notifications) {
        const $list = $("#notification-list-collision");
        const $content = $("#collision-risk-button").next();

        $list.empty(); 

        if (notifications.length !== 0) {
            $content.stop(true, true).slideDown();
        } else {
            $content.stop(true, true).slideUp();
        }

        notifications.forEach(notification => {
            const message = this.generateCollisionMessage(notification.nameA, notification.nameB, notification.distance);
            const li = $("<li>").html(`⚠️ [${notification.timestamp}] ${message}`);
            $list.prepend(li);
        });
    },
    renderSmugglingNotification: function (notifications, renderDiv, buttonDiv) {
        const $list = $(renderDiv);
        const $content = $(buttonDiv).next();

        $list.empty();

        if (notifications.length !== 0) {
            $content.stop(true, true).slideDown();
        } else {
            $content.stop(true, true).slideUp();
        }

        notifications.forEach(notification => {
            const message = this.generateSmugglingMessage(notification.name);
            const li = $("<li>").html(`⚠️ [${notification.timestamp}] ${message}`);
            $list.prepend(li);
        });
    },
    changeVisibility: function(element) {
        $(element).toggleClass("active");
        var $content = $(element).next();

        if ($content.is(":visible")) {
            this.makeDisplayNone($content);
        } else {
            this.makeDisplayBlock($content);
        }
    },
    makeDisplayNone: function($el) {
        $el.slideUp();
    },
    makeDisplayBlock: function($el) {
        $el.slideDown();
    },
    generateCollisionMessage: function(nameA, nameB, distance) {
        return `${nameA} and ${nameB} are ${Math.round(distance)} meters away.`
    },
    generateSmugglingMessage: function (name) {
        return `${name} has been following a straight course for a long time without making any maneuvers.`
    },
    getShipPixelSizeForDirection: function(v) {
        const minLength = 20;
        const maxLength = 400;

        const minBeam = 5/2;
        const maxBeam = 80;

        const normalizeLength = Math.min(Math.max((v.length - minLength) / (maxLength - minLength), 0), 1);
        const normalizeBeam = Math.min(Math.max((v.beam - minBeam) / (maxBeam - minBeam), 0), 1);

        const baseLengthMinPx = 10;
        const baseLengthMaxPx = 30;
        const baseBeamMinPx = 4;
        const baseBeamMaxPx = 10;

        let pixelLength = baseLengthMinPx + (baseLengthMaxPx - baseLengthMinPx) * normalizeLength;
        let pixelWidth = (baseBeamMinPx + (baseBeamMaxPx - baseBeamMinPx) * normalizeBeam) * 3;

        return { pixelLength, pixelWidth };
    },
    selectColor: function(type) {
        let iconColor = 'grey';

        switch (type) {
            case "cargo":
                iconColor = "green";
                break;
            case "tanker":
                iconColor = "red";
                break;
            case "passenger":
                iconColor = "darkblue";
                break;
            case "high_speed_craft":
                iconColor = "yellow";
                break;
            case "fishing":
                iconColor = "pink";
                break;
            case "tug":
                iconColor = "blue";
                break;
            case "pleasure_craft":
                iconColor = "purple";
                break;
            case "unspecified":
                break;
            default:
        }

        return iconColor;
    },
    makeCapitalize: function(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    },
    replaceUnderline: function (val) {
        return String(val).replace("_", " ");
    },
    getShipPixelSizeForShip: function(v, resolution) {
        const minLength = 20;
        const maxLength = 400;
        const minBeam = 5;
        const maxBeam = 60;

        const lengthMeters = Math.max(minLength, Math.min(maxLength, v.length));
        const beamMeters = Math.max(minBeam, Math.min(maxBeam, v.beam));

        let pixelLength = lengthMeters / resolution;
        let pixelWidth = beamMeters * 3 / resolution;

        const minPx = 4;
        const maxPx = 100;

        pixelLength = Math.max(minPx, Math.min(maxPx, pixelLength));
        pixelWidth = Math.max(minPx / 3, Math.min(maxPx / 3, pixelWidth));

        return { pixelLength, pixelWidth };
    },
    isLinearMovement: function(positions) {
        function vector(p1, p2) {
            return [p2[0] - p1[0], p2[1] - p1[1]];
        }

        function crossProduct(v1, v2) {
            return v1[0] * v2[1] - v1[1] * v2[0];
        }

        const baseVector = vector(positions[0], positions[1]);
        const tolerance = 1e-6;

        for (let i = 2; i < positions.length; i++) {
            const currentVector = vector(positions[0], positions[i]);
            const cross = crossProduct(baseVector, currentVector);
            if (Math.abs(cross) > tolerance) {
                return false;
            }
        }

        return true;
    },
    isSuspiciousRoute: function (history) {
        if (!history || history.length < 3) return false;

        const [p1, p2, p3, p4, p5] = history.slice(-5);

        const bearing = (from, to) => {
            const lat1 = from[1] * Math.PI / 180;
            const lon1 = from[0] * Math.PI / 180;
            const lat2 = to[1] * Math.PI / 180;
            const lon2 = to[0] * Math.PI / 180;

            const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
            const angle = Math.atan2(y, x) * 180 / Math.PI;
            return (angle + 360) % 360;
        };

        const angle1 = bearing(p1, p2);
        const angle2 = bearing(p2, p3);
        const angle3 = bearing(p3, p4);
        const angle4 = bearing(p4, p5);

        const angleDiff1 = Math.abs(angle1 - angle2);
        const angleDiff2 = Math.abs(angle2 - angle3);
        const angleDiff3 = Math.abs(angle3 - angle4);

        const isLinear = angleDiff1 < 0.1 && angleDiff2 < 0.1 && angleDiff3 < 0.1;

        return isLinear;
    },
    checkProximity: async function (featuresInsidePolygon, istanbulBosphorusNotifications) {
        const newNotifications = [];

        for (let i = 0; i < featuresInsidePolygon.length; i++) {
            for (let j = i + 1; j < featuresInsidePolygon.length; j++) {
                const featureA = featuresInsidePolygon[i];
                const featureB = featuresInsidePolygon[j];

                const [lonA, latA] = toLonLat(featureA.getGeometry().getCoordinates());
                const [lonB, latB] = toLonLat(featureB.getGeometry().getCoordinates());

                const distance = this.haversineDistance(latA, lonA, latB, lonB);

                if (distance < 500) {
                    const idA = featureA.get('shipData').id;
                    const idB = featureB.get('shipData').id;

                    const isShipsExists = istanbulBosphorusNotifications.some(n => n.idA == idA && n.idB == idB);
                    if (!isShipsExists || istanbulBosphorusNotifications.find(n => n.idA == idA && n.idB == idB).distance > distance) {
                        try {
                            const res = await fetch(`/api/ship/GetRiskyShipPair?id1=${featureA.get('shipData').id}&id2=${featureB.get('shipData').id}`);
                            const data = await res.json();
                            const ships = data.data;

                            this.showCollisionNotification(idA, ships[0], idB, ships[1], distance, newNotifications);
                        } catch (err) {
                            console.error("Fetch error:", err);
                        }
                    }
                }
            }
        }

        this.renderCollisionNotification(newNotifications);
    },
    checkSmugglingRisk: async function(featuresInsidePolygon, area, renderDiv, buttonDiv, polygonGeometry) {
        const newNotifications = [];

        featuresInsidePolygon.forEach(async (feature) => {
            const shipData = feature.get('shipData');
            const [lon, lat] = [shipData.lon, shipData.lat];
            const point = new Point(fromLonLat([lon, lat]));

            if (polygonGeometry.intersectsCoordinate(point.getCoordinates())) {
                let locationHistory = feature.get('locationHistory');

                const [currentLon, currentLat] = toLonLat(feature.getGeometry().getCoordinates());

                if (locationHistory == null) {
                    feature.set('locationHistory', [[currentLon, currentLat]]);
                    return;
                }

                locationHistory.push([currentLon, currentLat]);

                if (locationHistory.length >= 5) {
                    if (locationHistory.length != 5)
                        locationHistory.shift();

                    if (this.isSuspiciousRoute(locationHistory)) {
                        try {
                            const res = await fetch(`/api/ship/GetById/${shipData.id}`);
                            const data = await res.json();
                            const ship = data.data;

                            this.showSmugglingNotification(ship.id, ship.shipName, newNotifications, area);

                        } catch (e) {
                            console.error("Fetch error: ", e);
                        }
                    }
                }

                this.renderSmugglingNotification(newNotifications, renderDiv, buttonDiv);

                feature.set('locationHistory', locationHistory);
            }
        });
    },
    getFeaturesInsidePolygon: function(shipSource, polygonGeometry) {
        let featuresInsidePolygon = [];

        shipSource.getFeatures().forEach(feature => {
            const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
            const point = new Point(fromLonLat([lon, lat]));

            if (polygonGeometry.intersectsCoordinate(point.getCoordinates())) {
                featuresInsidePolygon.push(feature);
            }
        });

        return featuresInsidePolygon;
    },
    checkShipsInsideBlackSeaPolygon: function (shipSource, blackSeaPolygon, blackSeaTurkishCoastPolygon) {
        const polygonGeometry = blackSeaPolygon.getGeometry();

        const featuresInsidePolygon = this.getFeaturesInsidePolygon(shipSource, polygonGeometry);

        const TurkishCoastPolygonGeometry = blackSeaTurkishCoastPolygon.getGeometry();
        this.checkSmugglingRisk(featuresInsidePolygon, "Black Sea", "#notification-list-smuggling2", "#smuggling-risk-button2", TurkishCoastPolygonGeometry);
    },
    checkShipsInsideAegeanSeaPolygon: function (shipSource, aegeanSeaPolygon, aegeanSeaTurkishCoastPolygon) {
        const polygonGeometry = aegeanSeaPolygon.getGeometry();

        const featuresInsidePolygon = this.getFeaturesInsidePolygon(shipSource, polygonGeometry);

        const TurkishCoastPolygonGeometry = aegeanSeaTurkishCoastPolygon.getGeometry();
        this.checkSmugglingRisk(featuresInsidePolygon, "Aegean Sea", "#notification-list-smuggling", "#smuggling-risk-button", TurkishCoastPolygonGeometry);
    },
    checkShipsInsideBosphorusPolygonProximity: function (shipSource, bosphorusPolygon, istanbulBosphorusNotifications) {
        const polygonGeometry = bosphorusPolygon.getGeometry();

        const featuresInsidePolygon = this.getFeaturesInsidePolygon(shipSource, polygonGeometry);

        this.checkProximity(featuresInsidePolygon, istanbulBosphorusNotifications);
    },
    updateShipPositions: function (shipSource) {
        shipSource.getFeatures().forEach(feature => {
            const ship = feature.get('shipData');

            ship.heading = ship.heading + ship.headingChange * (Math.random() * 3 - 1.5);
            const speed = ship.speed;
            const heading = ship.heading;
            const dt = 5;
            const speedMps = speed * 0.514444;

            const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
            const latRad = lat * Math.PI / 180;

            const headingRad = heading * Math.PI / 180;

            const deltaLat = (speedMps * dt / 111000) * Math.cos(headingRad);
            const deltaLon = (speedMps * dt / (111000 * Math.cos(latRad))) * Math.sin(headingRad);

            const newLat = lat + deltaLat;
            const newLon = lon + deltaLon;

            feature.getGeometry().setCoordinates(fromLonLat([newLon, newLat]));
        });
    },
    updatePerFiveSeconds: function (shipSource, bosphorusPolygon, aegeanSeaPolygon, blackSeaPolygon, aegeanSeaTurkishCoastPolygon, blackSeaTurkishCoastPolygon, istanbulBosphorusNotifications) {
        this.updateShipPositions(shipSource);
        this.checkShipsInsideBosphorusPolygonProximity(shipSource, bosphorusPolygon, istanbulBosphorusNotifications);
        this.checkShipsInsideAegeanSeaPolygon(shipSource, aegeanSeaPolygon, aegeanSeaTurkishCoastPolygon);
        this.checkShipsInsideBlackSeaPolygon(shipSource, blackSeaPolygon, blackSeaTurkishCoastPolygon);
    },
    getShipScreenZone: function(feature, map) {
        const coordinate = feature.getGeometry().getCoordinates();
        const [px, py] = map.getPixelFromCoordinate(coordinate);

        const mapEl = map.getTargetElement();
        const mapWidth = mapEl.clientWidth;
        const mapHeight = mapEl.clientHeight;

        const hThreshold = mapHeight / 5;
        const wThreshold = mapWidth / 5;

        if (py < hThreshold && px < wThreshold) return 'top-left';
        if (py < hThreshold && px > mapWidth - wThreshold) return 'top-right';
        if (py > mapHeight - hThreshold && px < wThreshold) return 'bottom-left';
        if (py > mapHeight - hThreshold && px > mapWidth - wThreshold) return 'bottom-right';

        if (py < hThreshold) return 'top-center';
        if (py > mapHeight - hThreshold) return 'bottom-center';

        if (px < wThreshold) return 'center-left';
        if (px > mapWidth - wThreshold) return 'center-right';

        return 'center-left';
    }
}

export default Function;