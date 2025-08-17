'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/navbar";
import L from "leaflet";
import { useMap } from "react-leaflet";

// Data pantai Bali
const beaches = [
  { name: "Kuta Beach", lat: -8.718, lng: 115.168 },
  { name: "Pandawa Beach", lat: -8.8484, lng: 115.2250 },
  { name: "Melasti Beach", lat: -8.8489, lng: 115.1650 },
  { name: "Sanur Beach", lat: -8.690, lng: 115.261 },
];


// Hitung jarak antar koordinat (haversine)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius bumi (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Dynamic import react-leaflet agar jalan di Next.js
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Custom icon user (ambil dari /public/Leaflet)
const userIcon = new L.Icon({
  iconUrl: "/Leaflet/marker-icon.png",
  iconRetinaUrl: "/Leaflet/marker-icon-2x.png",
  shadowUrl: "/Leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Icon pantai (warna berbeda biar tidak sama dengan user)
const beachIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // icon pantai gratis
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

// Komponen untuk auto fly ke user
function FlyToUser({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

export default function Dashboard() {
  const [position, setPosition] = useState(null);
  const [nearestBeaches, setNearestBeaches] = useState([]);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = [latitude, longitude];
          setPosition(newPos);

          const beachesWithDistance = beaches.map((b) => ({
            ...b,
            distance: getDistanceFromLatLonInKm(latitude, longitude, b.lat, b.lng),
          }));

          beachesWithDistance.sort((a, b) => a.distance - b.distance);
          setNearestBeaches(beachesWithDistance);
        },
        (err) => {
          console.error(err);
          setGeoError(
            "Tidak bisa mendapatkan lokasi kamu. Pastikan izin lokasi aktif dan menggunakan HTTPS/localhost."
          );
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setGeoError("Geolocation tidak didukung di browser ini.");
    }
  }, []);

  const defaultCenter = [-8.718, 115.168]; // default ke Kuta

  return (
    <div>

      {geoError && <p className="text-red-600 mb-2">{geoError}</p>}

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={position || defaultCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {position && <FlyToUser position={position} />}

          {position && (
            <Marker position={position} icon={userIcon}>
              <Popup>Lokasi Kamu (real-time)</Popup>
            </Marker>
          )}

          {nearestBeaches.map((beach, idx) => (
            <Marker key={idx} position={[beach.lat, beach.lng]} icon={beachIcon}>
              <Popup>
                {beach.name} - {beach.distance.toFixed(2)} km
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h2 className="text-xl font-semibold mt-4">Pantai terdekat:</h2>
      {nearestBeaches.length > 0 ? (
        <ul className="list-disc ml-6 mt-2">
          {nearestBeaches.map((b, idx) => (
            <li key={idx}>
              {b.name} - {b.distance.toFixed(2)} km
            </li>
          ))}
        </ul>
      ) : (
        <p>Menunggu lokasi...</p>
      )}
    </div>
  );
}
