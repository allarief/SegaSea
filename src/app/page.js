'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Banner from "./components/Banner";
import CardList from "./components/CardList";
import GalleryCard from "./components/GalleryCard";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold my-3 py-2 px-3 text-center">
        {user
          ? `Hi Welcome, ${user.displayName || user.email} to SegaSea 👋`
          : "Hi Welcome to SegaSea 👋"}
      </h1>

      <Banner />

      <div className="flex gap-4 px-3 py-4 justify-center">
        <CardList />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Image
      </h1>

      {/* Kumpulan gambar bagian 1 */}
      <div className="flex gap-6 flex-wrap justify-center py-6">
        <GalleryCard image="pandawa.jpg" />
        <GalleryCard image="melasti.jpg" />
        <GalleryCard image="peninsula.jpg" />
      </div>

      {/* Kumpulan gambar bagian 2 */}
      <div className="flex gap-6 flex-wrap justify-center py-6">
        <GalleryCard image="kuta.jpg" />
        <GalleryCard image="grid1.jpg" />
        <GalleryCard image="grid3.jpeg" />
      </div>
    </div>
  );
}
