type mocksDataOffers = {
  id_card: number,
  is_active: boolean,
  bedrooms: number,
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    },
    name: string
  },
  description: string,
  goods: string[],
  host: {
    avatar_url: string,
    id: number,
    is_pro: true,
    name: string
  },
  id: number,
  images: string[],
  is_favorite: boolean,
  is_premium: boolean,
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  max_adults: number,
  preview_image: string,
  price: number,
  rating: number,
  title: string,
  type: string
}[];

const mocksDataOffers: mocksDataOffers = [
  {
    id_card: 1,
    is_active: false,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    host: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 3,
      is_pro: true,
      name: "Angelina"
    },
    id: 0,
    images: ["img/room.jpg", "img/apartment-01.jpg"],
    is_favorite: true,
    is_premium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    max_adults: 4,
    preview_image: "img/apartment-01.jpg",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location1",
    type: "apartment"
  },
  {
    id_card: 2,
    is_active: false,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Cologne'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    host: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 3,
      is_pro: true,
      name: "Angelina"
    },
    id: 1,
    images: ["img/room.jpg", "img/apartment-01.jpg"],
    is_favorite: true,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    max_adults: 4,
    preview_image: "img/apartment-01.jpg",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location2",
    type: "apartment"
  },
  {
    id_card: 3,
    is_active: false,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Dusseldorf'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    host: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 3,
      is_pro: true,
      name: "Angelina"
    },
    id: 2,
    images: ["img/room.jpg", "img/apartment-01.jpg"],
    is_favorite: true,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    max_adults: 4,
    preview_image: "img/apartment-01.jpg",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location3",
    type: "apartment"
  },
  {
    id_card: 4,
    is_active: false,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    host: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 3,
      is_pro: true,
      name: "Angelina"
    },
    id: 3,
    images: ["img/room.jpg", "img/apartment-01.jpg"],
    is_favorite: true,
    is_premium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    max_adults: 4,
    preview_image: "img/apartment-01.jpg",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location4",
    type: "apartment"
  },
  {
    id_card: 5,
    is_active: false,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    host: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 3,
      is_pro: true,
      name: "Angelina"
    },
    id: 4,
    images: ["img/room.jpg", "img/apartment-01.jpg"],
    is_favorite: false,
    is_premium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    max_adults: 4,
    preview_image: "img/apartment-01.jpg",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location5",
    type: "apartment"
  }
];

export default mocksDataOffers;