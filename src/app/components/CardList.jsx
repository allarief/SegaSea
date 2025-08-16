// src/app/components/CardList.jsx
'use client';
import Card from './Card';

export default function CardList() {
  const cards = [
    {
      title: 'Peninsula Island',
      description: 'Escape to Bali’s Peninsula Magic.',
      image: '/peninsula.jpg',
    },
    {
      title: 'Pandawa Beach',
      description: 'The Legendary White Sands of Bali.',
      image: '/pandawa.jpg',
    },
    {
      title: 'Kuta Beach',
      description: 'Ride the Waves, Feel the Vibe.',
      image: 'kuta.jpg',
    },
    {
      title: 'Melasti Beach',
      description: 'Where Cliffs Guard the Crystal Sea.',
      image: 'melasti.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">The Best Choice for you</h1>
      <br />
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
