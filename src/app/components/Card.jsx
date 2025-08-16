
export default function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
    
  );
}
