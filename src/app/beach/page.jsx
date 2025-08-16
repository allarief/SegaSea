import BeachCard from "../components/BeachCard";

export default function BeachListPage() {
  const beaches = [
    {
      id: 1,
      name: "Kuta Beach",
      description: "Pantai pasir putih yang terkenal di Bali, cocok untuk berselancar.",
      image: "kuta.jpg"
    },
    {
      id: 2,
      name: "Sanur Beach",
      description: "Pantai dengan suasana tenang dan sunrise yang indah.",
      image: "sanur.jpg"
    },
    {
      id: 3,
      name: "Pandawa Beach",
      description: "Pantai dengan tebing tinggi dan pasir putih bersih.",
      image: "pandawa.jpg"
    },
    {
      id: 4,
      name: "Melasti Beach",
      description: "Pantai yang terkenal dengan resor mewah dan pasir putihnya.",
      image: "melasti.jpg"
    },
    {
      id: 5,
      name: "Peninsula Beach",
      description: "Pantai dengan tebing tinggi dan pasir putih bersih.",
      image: "peninsula.jpg"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Pantai</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {beaches.map((beach) => (
          <BeachCard key={beach.id} {...beach} />
        ))}
      </div>
    </div>
  );
}
