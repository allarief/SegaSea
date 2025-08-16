export default function BeachDetail({ params }) {
  // Data dummy (bisa ganti dengan fetch API atau DB)
  const beaches = [
    {
      id: 1,
      name: "Kuta Beach",
      description: "Pantai pasir putih yang terkenal di Bali, cocok untuk berselancar dan menikmati matahari terbenam.",
      image: "https://picsum.photos/800/500?random=1"
    },
    {
      id: 2,
      name: "Sanur Beach",
      description: "Pantai dengan suasana tenang dan sunrise yang indah. Cocok untuk keluarga.",
      image: ""
    },
    {
      id: 3,
      name: "Pandawa Beach",
      description: "Pantai dengan tebing tinggi dan pasir putih bersih. Sangat cocok untuk berenang.",
      image: "https://picsum.photos/800/500?random=3"
    },
    {
      id: 4,
      name: "Melasti Beach",
      description: "Pantai yang terkenal dengan resor mewah dan pasir putihnya.",
      image: "https://picsum.photos/800/500?random=4"
    },
    {
      id: 5,
      name: "Peninsula Beach",
      description: "Pantai dengan tebing tinggi dan pasir putih bersih.",
      image: "https://picsum.photos/800/500?random=5"
    }
  ];

  const placeholder = "https://via.placeholder.com/800x500?text=No+Image";
  const beach = beaches.find((b) => b.id.toString() === params.id);

  if (!beach) {
    return <p className="p-6 text-red-500">Pantai tidak ditemukan.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{beach.name}</h1>
      <img
        src={beach.image || placeholder}
        alt={beach.name}
        className="w-full max-w-3xl rounded-lg shadow-md mb-4"
      />
      <p className="text-lg text-gray-700">{beach.description}</p>
    </div>
  );
}
