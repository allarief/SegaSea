"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const beaches = [
    {
      name: "Pandawa Beach",
      lat: -8.8487,
      lng: 115.1863,
      link: "https://maps.app.goo.gl/gpA9KZ64JqtETkKK8",
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126184.7515145612!2d115.12160874581983!3d-8.760319164826488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b7cd8ba1f31%3A0x41b8785dd055b2a4!2sPandawa%20Beach!5e0!3m2!1sen!2sid!4v1756106823125!5m2!1sen!2sid",
    },
    {
      name: "Melasti Beach",
      lat: -8.8482,
      lng: 115.1533,
      link: "https://maps.app.goo.gl/iX5WWnWy2bNqpmfH8",
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15769.344195800302!2d115.15286996318517!3d-8.84827195687623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25be3c65bc987%3A0xfadb552ebfa90802!2sMelasti%20Beach!5e0!3m2!1sen!2sid!4v1756107070390!5m2!1sen!2sid",
    },
    {
      name: "Kuta Beach",
      lat: -8.7186,
      lng: 115.1686,
      link: "https://maps.app.goo.gl/JnfbhZwWuA5JkqgJ9",
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7887.441994273833!2d115.16288469514151!3d-8.718021910419804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd246bc2ab70d43%3A0x82feaae12f4ab48e!2sKuta%20Beach!5e0!3m2!1sen!2sid!4v1756107167813!5m2!1sen!2sid",
    },
  ];

  const [nearestBeach, setNearestBeach] = useState(null);

  // fungsi hitung jarak (haversine)
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        let nearest = beaches[0];
        let minDist = getDistance(latitude, longitude, nearest.lat, nearest.lng);

        beaches.forEach((beach) => {
          const dist = getDistance(latitude, longitude, beach.lat, beach.lng);
          if (dist < minDist) {
            nearest = beach;
            minDist = dist;
          }
        });

        setNearestBeach(nearest);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        // kalau gagal, kasih info ke user
        alert("⚠️ Tidak bisa menentukan lokasi. Aktifkan GPS dan izinkan akses lokasi.");
      },
      {
        enableHighAccuracy: true, // lebih akurat (pakai GPS kalau ada)
        timeout: 10000,           // maksimal nunggu 10 detik
        maximumAge: 0             // jangan pakai cache lokasi lama
      }
    );
  } else {
    alert("Browser kamu tidak mendukung geolocation.");
  }
}, []);


  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Embed maps */}
      <div className="w-full h-[500px]">
        {nearestBeach ? (
          <iframe
            src={nearestBeach.embed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          <p className="p-4">📍 Menentukan lokasi kamu...</p>
        )}
      </div>

      <div className="p-6">
        {nearestBeach && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg">
            🌊 Pantai terdekat kamu adalah{" "}
            <span className="font-bold">{nearestBeach.name}</span>
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">Daftar Pantai</h2>
        <ul className="space-y-3">
          {beaches.map((beach, index) => (
            <li key={index}>
              <a
                href={beach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                📍 {beach.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
