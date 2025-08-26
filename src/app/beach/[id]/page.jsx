"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function BeachDetail({ params }) {
  const beaches = [
    { id: 1, name: "Kuta Beach", description: "Pantai pasir putih yang terkenal di Bali, cocok untuk berselancar dan menikmati matahari terbenam.", image: "/kuta.jpg" },
    { id: 2, name: "Sanur Beach", description: "Pantai dengan suasana tenang dan sunrise yang indah. Cocok untuk keluarga.", image: "/sanur.jpg" },
    { id: 3, name: "Pandawa Beach", description: "Pantai dengan tebing tinggi dan pasir putih bersih. Sangat cocok untuk berenang.", image: "/pandawa.jpg" },
    { id: 4, name: "Melasti Beach", description: "Pantai yang terkenal dengan resor mewah dan pasir putihnya.", image: "/melasti.jpg" },
    { id: 5, name: "Peninsula Beach", description: "Pantai dengan tebing tinggi dan pasir putih bersih.", image: "/peninsula.jpg" }
  ];

  const placeholder = "https://via.placeholder.com/800x500?text=No+Image";
  const beach = beaches.find((b) => b.id.toString() === params.id);

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Cek login user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil ulasan realtime
  useEffect(() => {
  if (!beach?.id) return; // pastikan beach.id ada

  const q = query(
  collection(db, "reviews"),
  orderBy("createdAt", "desc")
);

  const unsub = onSnapshot(
  q,
  (snapshot) => {
    setReviews(
      snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((d) => d.beachId === beach.id.toString()) // filter manual
    );
  },
  (error) => {
    console.error("Firestore error:", error);
  }
);


  return () => unsub();
}, [beach?.id]);


  // Submit ulasan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login dulu ya!");
    if (!comment || rating === 0) return alert("Isi ulasan dan rating!");

    await addDoc(collection(db, "reviews"), {
      beachId: beach.id.toString(),
      userId: user.uid,
      userName: user.displayName || "Anonim",
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    setComment("");
    setRating(0);
  };

  // Hapus ulasan
  const handleDelete = async (id) => {
    if (confirm("Yakin mau hapus ulasan ini?")) {
      await deleteDoc(doc(db, "reviews", id));
    }
  };

  if (!beach) {
    return <p className="p-6 text-red-500">Pantai tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Kiri: detail pantai */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{beach.name}</h1>
        <img
          src={beach.image || placeholder}
          alt={beach.name}
          className="w-full max-w-3xl rounded-lg shadow-md mb-4"
        />
        <p className="text-lg text-gray-700">{beach.description}</p>
      </div>

      {/* Kanan: ulasan */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Ulasan</h2>
        {user ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis ulasanmu..."
              className="w-full border rounded-lg p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Kirim
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-3">Login untuk memberi ulasan.</p>
        )}

        {/* Daftar ulasan */}
        <div className="space-y-3">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div
                key={r.id}
                className="border rounded-lg p-3 bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{r.userName}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </p>
                  <p>{r.comment}</p>
                </div>

                {/* Tombol hapus hanya untuk pemilik ulasan */}
                {user && user.uid === r.userId && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada ulasan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
