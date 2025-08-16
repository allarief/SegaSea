'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/navbar";

// Data pantai Bali
const beaches = [
  { name: "Kuta Beach", lat: -8.718, lng: 115.168 },
  { name: "Pandawa Beach", lat: -8.786, lng: 115.236 },
  { name: "Melasti Beach", lat: -8.799, lng: 115.259 },
  { name: "Sanur Beach", lat: -8.690, lng: 115.261 },
];

// Fungsi hitung jarak Haversine
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2)**2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Dynamic import untuk Leaflet Map
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

export default function Dashboard() {
  const [position, setPosition] = useState(null);
  const [nearestBeaches, setNearestBeaches] = useState([]);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          const beachesWithDistance = beaches.map((b) => ({
            ...b,
            distance: getDistanceFromLatLonInKm(latitude, longitude, b.lat, b.lng)
          }));

          beachesWithDistance.sort((a, b) => a.distance - b.distance);
          setNearestBeaches(beachesWithDistance);
        },
        (err) => {
          console.error(err);
          setGeoError("Tidak bisa mendapatkan lokasi kamu. Pastikan izin lokasi diaktifkan dan menggunakan HTTPS/localhost.");
        }
      );
    } else {
      setGeoError("Geolocation tidak didukung di browser ini.");
    }
  }, []);

  // Default center jika posisi belum tersedia
  const defaultCenter = [-8.718, 115.168]; // Kuta Beach

  return (
    <div>
      {geoError && (
        <p className="text-red-600 mb-2">{geoError}</p>
      )}

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer center={position || defaultCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Marker lokasi pengguna */}
          {position && (
            <Marker position={position}>
              <Popup>Kamu</Popup>
            </Marker>
          )}

          {/* Marker pantai */}
          {nearestBeaches.map((beach, idx) => (
            <Marker key={idx} position={[beach.lat, beach.lng]}>
              <Popup>{beach.name} - {beach.distance.toFixed(2)} km</Popup>
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
