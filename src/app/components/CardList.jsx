'use client';
import Card from './Card';
import Link from 'next/link';

export default function CardList() {
  const cards = [
    {
      id: 5,
      title: 'Peninsula Beach',
      description: 'Escape to Bali’s Peninsula Magic.',
      image: '/peninsula.jpg',
    },
    {
      id: 3,
      title: 'Pandawa Beach',
      description: 'The Legendary White Sands of Bali.',
      image: '/pandawa.jpg',
    },
    {
      id: 1,
      title: 'Kuta Beach',
      description: 'Ride the Waves, Feel the Vibe.',
      image: '/kuta.jpg',
    },
    {
      id: 4,
      title: 'Melasti Beach',
      description: 'Where Cliffs Guard the Crystal Sea.',
      image: '/melasti.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        The Best Choice for you
      </h1>
      <br />
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card) => (
          <Link href={`/beach/${card.id}`} key={card.id}>
            <Card
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
