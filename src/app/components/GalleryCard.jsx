export default function GalleryCard({ image }) {
  const placeholder = "https://via.placeholder.com/300x192?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs transform transition hover:scale-105 hover:shadow-lg">
      <img
        src={image || placeholder}
        alt="Gallery Image"
        className="w-70 h-64 object-cover"
      />
    </div>
  );
}
