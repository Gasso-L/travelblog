const posts = [
  {
    _id: "post001",
    title: "Hidden Corners of Kyoto",
    images: [
      "/kyoto/kyoto01.jpg",
      "/kyoto/kyoto02.jpg",
      "/kyoto/kyoto03.jpg",
      "/kyoto/kyoto04.jpg",
      "/kyoto/kyoto05.jpg",
    ],
    location: "Kyoto, Japan",
    tags: ["japan", "temples", "culture", "kyoto", "gourmet", "food"],
    author: {
      _id: "user001",
      firstName: "Haruki",
      userName: "matcha_wanderer",
      email: "haruki@example.com",
      avatar: "/avatars/avatar2.png",
    },
    content:
      "Wander through Kyoto's lesser-known shrines, sip matcha in quiet tea houses, and discover the timeless beauty of Japan's cultural heart.",
    comments: [
      {
        _id: "comment001",
        content: "Sounds incredible!",
        user: {
          _id: "user004",
          userName: "temple_lover",
          avatar: "/avatars/avatar3.png",
        },
        post: "post001",
        createdAt: "2025-07-01T12:15:00Z",
      },
      {
        _id: "comment002",
        content: "Kyoto is magical.",
        user: {
          _id: "user005",
          userName: "camden_storyteller",
          avatar: "/avatars/avatar4.png",
        },
        post: "post001",
        createdAt: "2025-07-01T14:20:00Z",
      },
    ],

    likes: ["user004", "user005"],
    ratings: [
      { user: "user004", value: 5 },
      { user: "user005", value: 5 },
    ],
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
  },
  {
    _id: "post002",
    title: "New York in 48 Hours",
    images: [
      "/newyork/newyork01.jpg",
      "/newyork/newyork02.jpg",
      "/newyork/newyork03.jpg",
      "/newyork/newyork04.jpg",
      "/newyork/newyork05.jpg",
    ],
    location: "New York, USA",
    tags: ["usa", "city", "urban", "culture"],
    author: {
      _id: "user002",
      firstName: "Jasmine",
      userName: "nyc_escape",
      email: "jasmine@example.com",
      avatar: "/avatars/avatar1.png",
    },

    content:
      "From rooftop views in Manhattan to hidden jazz bars in Harlem, here's how to make the most of two unforgettable days in NYC.",
    comments: [
      {
        _id: "commentNY001",
        content: "Love this itinerary! Manhattan rooftops are unmatched.",
        user: {
          _id: "user006",
          userName: "bonjour_paris",
          avatar: "/avatars/avatar3.png",
        },
        post: "post002",
        createdAt: "2025-06-28T18:10:00Z",
      },
      {
        _id: "commentNY002",
        content: "Jazz in Harlem is something else. Thanks for the tip!",
        user: {
          _id: "user001",
          userName: "matcha_wanderer",
          avatar: "/avatars/avatar2.png",
        },
        post: "post002",
        createdAt: "2025-06-28T19:45:00Z",
      },
    ],

    likes: ["user001", "user004", "user005"],
    ratings: [
      { user: "user006", value: 5 },
      { user: "user001", value: 4 },
    ],
    createdAt: "2025-06-28T14:30:00Z",
    updatedAt: "2025-06-28T14:30:00Z",
  },
  {
    _id: "post003",
    title: "A Roman Holiday Beyond the Colosseum",
    images: [
      "/rome/rome01.png",
      "/rome/rome02.png",
      "/rome/rome03.jpg",
      "/rome/rome04.jpg",
      "/rome/rome05.jpg",
    ],
    location: "Rome, Italy",
    tags: ["italy", "history", "food", "culture"],
    author: {
      _id: "user003",
      firstName: "Giulia",
      userName: "trastevere_vibes",
      email: "giulia@example.com",
      avatar: "/avatars/avatar5.png",
    },

    content:
      "Skip the crowds and explore Rome's hidden piazzas, local trattorias, and artisan gelato spots that only locals know.",
    comments: [
      {
        _id: "commentROMA001",
        content: "The trattorias in Trastevere are amazing — loved every bite!",
        user: {
          _id: "user005",
          userName: "camden_storyteller",
          avatar: "/avatars/avatar4.png",
        },
        post: "post003",
        createdAt: "2025-07-02T13:45:00Z",
      },
      {
        _id: "commentROMA002",
        content: "I had no idea about those hidden piazzas — need to go back.",
        user: {
          _id: "user006",
          userName: "bonjour_paris",
          avatar: "/avatars/avatar3.png",
        },
        post: "post003",
        createdAt: "2025-07-02T15:10:00Z",
      },
      {
        _id: "commentROMA003",
        content: "Rome is always beautiful!",
        user: {
          _id: "user001",
          userName: "matcha_wanderer",
          avatar: "/avatars/avatar2.png",
        },
        post: "post003",
        createdAt: "2025-07-02T17:00:00Z",
      },
    ],

    likes: ["user001"],
    ratings: [
      { user: "user001", value: 5 },
      { user: "user005", value: 4 },
      { user: "user006", value: 4 },
    ],
    createdAt: "2025-07-02T11:00:00Z",
    updatedAt: "2025-07-02T11:00:00Z",
  },
  {
    _id: "post004",
    title: "Mediterranean Charm in Malta",
    images: [
      "/malta/malta01.jpg",
      "/malta/malta02.jpg",
      "/malta/malta03.jpg",
      "/malta/malta04.jpg",
      "/malta/malta05.jpg",
    ],
    location: "Valletta, Malta",
    tags: ["malta", "history", "island", "culture"],
    author: {
      _id: "user004",
      firstName: "Elena",
      userName: "suntrail_explorer",
      email: "elena@example.com",
      avatar: "/avatars/avatar3.png",
    },

    content:
      "Wander through Valletta's golden streets, dive into the Blue Lagoon, and discover ancient temples older than the pyramids. Malta is a Mediterranean gem full of contrasts.",
    comments: [
      {
        _id: "commentMLT001",
        content: "Valletta at sunset is simply magical. Great suggestions!",
        user: {
          _id: "user002",
          userName: "nyc_escape",
          avatar: "/avatars/avatar1.png",
        },
        post: "post004",
        createdAt: "2025-07-03T11:15:00Z",
      },
      {
        _id: "commentMLT002",
        content: "The Blue Lagoon is unreal — I took a kayak out last summer!",
        user: {
          _id: "user006",
          userName: "bonjour_paris",
          avatar: "/avatars/avatar3.png",
        },
        post: "post004",
        createdAt: "2025-07-03T13:30:00Z",
      },
      {
        _id: "commentMLT003",
        content: "I've been there, wonderful",
        user: {
          _id: "user005",
          userName: "camden_storyteller",
          avatar: "/avatars/avatar4.png",
        },
        post: "post004",
        createdAt: "2025-07-03T15:00:00Z",
      },
    ],
    likes: ["user001", "user003"],
    ratings: [
      { user: "user002", value: 5 },
      { user: "user006", value: 4 },
      { user: "user005", value: 4 },
    ],
    createdAt: "2025-07-03T10:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
  },
  {
    _id: "post005",
    title: "London Icons & Hidden Corners",
    images: [
      "/london/london01.png",
      "/london/london02.jpg",
      "/london/london03.jpg",
      "/london/london04.jpg",
      "/london/london05.jpg",
    ],
    location: "London, United Kingdom",
    tags: ["uk", "city", "culture"],
    author: {
      _id: "user005",
      firstName: "Liam",
      userName: "camden_storyteller",
      email: "liam@example.com",
      avatar: "/avatars/avatar4.png",
    },
    content:
      "From iconic landmarks like Big Ben and Tower Bridge to the indie soul of Camden and cozy pubs in Soho, London is a city of contrasts and character. Walk, sip, explore — and let the city surprise you.",
    comments: [],
    likes: ["user001", "user003"],
    ratings: [
      { user: "user001", value: 5 },
      { user: "user003", value: 4 },
    ],
    createdAt: "2025-07-04T09:30:00Z",
    updatedAt: "2025-07-04T09:30:00Z",
  },
  {
    _id: "post006",
    title: "Charming Streets of Paris",
    images: [
      "/paris/paris01.jpg",
      "/paris/paris02.jpg",
      "/paris/paris03.jpg",
      "/paris/paris04.jpg",
    ],
    location: "Paris, France",
    tags: ["france", "city", "culture"],
    author: {
      _id: "user006",
      firstName: "Isabelle",
      userName: "bonjour_paris",
      email: "isabelle@example.com",
      avatar: "/avatars/avatar3.png",
    },
    content:
      "Stroll along the Seine at sunset, discover hidden patisseries in Le Marais, and soak up art and history at every corner of the City of Light.",
    comments: [
      {
        _id: "commentPAR001",
        content: "I can almost taste the macarons!",
        user: {
          _id: "user004",
          userName: "suntrail_explorer",
          avatar: "/avatars/avatar3.png",
        },
        post: "post006",
        createdAt: "2025-07-05T11:15:00Z",
      },
      {
        _id: "commentPAR002",
        content: "Paris is always a good idea.",
        user: {
          _id: "user003",
          userName: "trastevere_vibes",
          avatar: "/avatars/avatar5.png",
        },
        post: "post006",
        createdAt: "2025-07-05T12:40:00Z",
      },
      {
        _id: "commentPAR003",
        content: "Loved the stroll along the Seine — absolutely magical.",
        user: {
          _id: "user001",
          userName: "matcha_wanderer",
          avatar: "/avatars/avatar2.png",
        },
        post: "post006",
        createdAt: "2025-07-05T14:10:00Z",
      },
    ],
    likes: ["user002", "user005"],
    ratings: [
      { user: "user004", value: 4 },
      { user: "user003", value: 2 },
      { user: "user001", value: 2 },
    ],
    createdAt: "2025-07-05T10:00:00Z",
    updatedAt: "2025-07-05T10:00:00Z",
  },
  {
    _id: "post007",
    title: "Sunrise Over Bali Rice Terraces",
    images: [
      "/bali/bali01.jpg",
      "/bali/bali02.jpg",
      "/bali/bali03.jpg",
      "/bali/bali04.jpg",
      "/bali/bali05.jpg",
    ],
    location: "Ubud, Bali",
    tags: ["indonesia", "nature", "beach", "culture"],
    author: {
      _id: "user007",
      firstName: "Made",
      userName: "island_dreamer",
      email: "made@example.com",
      avatar: "/avatars/avatar2.png",
    },
    content:
      "Wake up to golden light cascading over emerald rice fields, explore hidden waterfalls, and find inner peace in Bali's lush heartland.",
    comments: [
      {
        _id: "commentBALI001",
        content: "That view is unreal!",
        user: {
          _id: "user003",
          userName: "trastevere_vibes",
          avatar: "/avatars/avatar5.png",
        },
        post: "post007",
        createdAt: "2025-07-05T13:15:00Z",
      },
      {
        _id: "commentBALI002",
        content: "I’d wake up early every day for that kind of sunrise.",
        user: {
          _id: "user006",
          userName: "bonjour_paris",
          avatar: "/avatars/avatar3.png",
        },
        post: "post007",
        createdAt: "2025-07-05T14:00:00Z",
      },
      {
        _id: "commentBALI003",
        content: "Hidden waterfalls in Bali? Count me in. Sounds magical.",
        user: {
          _id: "user002",
          userName: "nyc_escape",
          avatar: "/avatars/avatar1.png",
        },
        post: "post007",
        createdAt: "2025-07-05T15:35:00Z",
      },
    ],
    likes: ["user001", "user003", "user006"],
    ratings: [
      { user: "user003", value: 5 },
      { user: "user006", value: 3 },
      { user: "user002", value: 3 },
    ],
    createdAt: "2025-07-05T12:30:00Z",
    updatedAt: "2025-07-05T12:30:00Z",
  },
  {
    _id: "post008",
    title: "Carnival Colors in Rio de Janeiro",
    images: ["/rio/rio01.jpg", "/rio/rio02.jpg", "/rio/rio03.jpg"],
    location: "Rio de Janeiro, Brazil",
    tags: ["brazil", "festival", "beach", "culture"],
    author: {
      _id: "user008",
      firstName: "Thiago",
      userName: "carioca_spirit",
      email: "thiago@example.com",
      avatar: "/avatars/avatar9.png",
    },
    content:
      "Dance through the streets during Carnival, relax on Copacabana's golden sands, and take in the breathtaking view from Cristo Redentor.",
    comments: [],
    likes: ["user002"],
    ratings: [
      { user: "user004", value: 2 },
      { user: "user002", value: 3 },
    ],
    createdAt: "2025-07-06T08:45:00Z",
    updatedAt: "2025-07-06T08:45:00Z",
  },
];

export default posts;
