import type { ImageMetadata } from 'astro';
import { getEntry } from 'astro:content';
import ExhibitionImage from '../assets/article_dagoma_harty/cover.jpg';
import ExhibitionImage1 from '../assets/adresses/ad1.jpg';
import ExhibitionImage2 from '../assets/adresses/ad2.png';
import ExhibitionImage3 from '../assets/adresses/ad3.png';
import ExhibitionImage4 from '../assets/adresses/ad4.png';





export interface Address {
	id: string;
	title: string;
	auteur: string;
	venue: string;
	address: string;
	description: string;
	price: string;
	image: ImageMetadata;
	imageAlt: string;
	startsAt?: string;
	endsAt?: string;
	coordinates?: [number, number];
	articleUrl?: string;
}

// Première adresse reprise du blog. La sélection pourra être complétée
// avec les lieux de la carte fournie par le BDA, sans dépendre de Google Maps.
export async function getAddresses(): Promise<Address[]> {
	const article = await getEntry('blog', 'article_exemple');
	if (!article) return [];

	return [
		{
  id: 'ma-nouvelle-adresse',
  title: 'OUR DREAMS BEGAN TO CHASE US BACK',
  auteur: "lala",
  venue: 'GALERIE PIERRE CORNETTE DE SAINT-CYR',
  address: '29 Avenue Franklin D. Roosevelt, 75008 Paris',
  description: "Une des expositions les plus poétiques de cet automne où l'artiste sud-Africane peint sur du paipier dentelle, un marqueur de son histoire famillilale.",
  price: 'Entrée libre',
  image: ExhibitionImage1,
  imageAlt: "Une des expositions les plus poétiques de cet automne où l'artiste sud-Africane peint sur du paipier dentelle, un marqueur de son histoire famillilale.",
  startsAt: '2026-10-19',
  endsAt: '2026-12-19',
  coordinates: [48.867154, 2.309544],
},
{
  id: 'ma-nouvelle-adresse',
  title: 'Estampes choisies',
  auteur: "Mamma Andersson, Nalini Malani, Alison Saar",
  venue: 'GALERIE LELONG',
  address: '13 rue de Téhéran, Paris',
  description: 'Une courte présentation du lieu ou de l’exposition.',
  price: 'Entrée libre',
  image: ExhibitionImage2,
  imageAlt: "Une des expositions les plus poétiques de cet automne où l'artiste sud-Africane peint sur du paipier dentelle, un marqueur de son histoire famillilale.",
  startsAt: '2026-10-19',
  endsAt: '2026-12-19',
  coordinates: [48.876819, 2.312659],
},
{
  id: 'ma-nouvelle-adresse',
  title: 'The Venice Paintings',
  auteur: "David Salle",
  venue: 'Thaddaeus Ropac',
  address: '69 Av. du Général Leclerc, 93500 Pantin',
  description: 'Une courte présentation du lieu ou de l’exposition.',
  price: 'Entrée libre',
  image: ExhibitionImage3,
  imageAlt: "Une des expositions les plus poétiques de cet automne où l'artiste sud-Africane peint sur du paipier dentelle, un marqueur de son histoire famillilale.",
  startsAt: '2026-10-21',
  endsAt: '2026-12-23',
  coordinates: [48.899492, 2.407799],
},
{
  id: 'ma-nouvelle-adresse',
  title: 'Winter Sun',
  auteur: "Jordan Casteel,",
  venue: 'Thaddaeus Ropac',
  address: '7 Rue Debelleyme, 75003 Paris',
  description: 'Une courte présentation du lieu ou de l’exposition.',
  price: 'Entrée libre',
  image: ExhibitionImage4,
  imageAlt: "Une des expositions les plus poétiques de cet automne où l'artiste sud-Africane peint sur du paipier dentelle, un marqueur de son histoire famillilale.",
  startsAt: '2026-10-21',
  endsAt: '2026-12-23',
  coordinates: [48.860265, 2.363881],
},
	];
}
