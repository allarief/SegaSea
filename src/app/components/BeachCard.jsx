import Link from "next/link";

export default function BeachCard({ id, name, description, image }) {
  const placeholder = "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <Link href={`/beach/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm transform transition hover:scale-105 hover:shadow-lg">
        <img
          src={image || placeholder}
          alt={name || "Beach"}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name || "No Name"}</h2>
          <p className="text-gray-600 line-clamp-2">
            {description || "No description available."}
          </p>
        </div>
      </div>
    </Link>
  );
}
