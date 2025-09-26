// React Leaflet imports
import "leaflet/dist/leaflet.css";

// Leaflet icon fix
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import { useMap } from "react-leaflet";
import "leaflet-ant-path"; // important side-effect import

const AntPathLayer = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const antPolyline = L.polyline.antPath(positions, {
      paused: false,
      reverse: false,
      delay: 400,
      dashArray: [10, 20],
      weight: 1,
      color: "#0000FF",
      pulseColor: "#FFFFFF",
    });

    antPolyline.addTo(map);

    return () => {
      map.removeLayer(antPolyline);
    };
  }, [map, positions]);

  return null;
};

// Custom driver icon (red)
const driverIcon = new L.Icon({
  iconUrl: "../../src/assets/react.svg",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

// Custom user icon (green)
const userIcon = new L.Icon({
  iconUrl: "../../public/vite.svg",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

const Contact = () => {
  const [position, setPosition] = useState([6.5445814, 3.2547326]); // default Lagos
  const [userLocus, setUserLocus] = useState(null); // will hold user location

  // Get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocus([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => [prev[0] + 0.0001, prev[1] + 0.0001]); // move slightly
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Example: geocode "Ikotun, Lagos"
  useEffect(() => {
    fetch(
      "https://nominatim.openstreetmap.org/search?q=Ikotun%2C+Lagos&format=json&limit=1"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {userLocus && position && (
          <>
            <Polyline
              positions={[userLocus, position]}
              pathOptions={{ color: "yellow", weight: 4, opacity: 0.7 }}
            />
            {/* <AntPathLayer positions={[userLocus, position]} /> */}
          </>
        )}

        <Marker position={position} icon={driverIcon}>
          <Popup>75 Ikotun - Idimu Rd, Ikotun, Lagos</Popup>
        </Marker>
        {userLocus && (
          <Marker position={userLocus} icon={userIcon}>
            <Popup>Your current location 📍</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Contact;
