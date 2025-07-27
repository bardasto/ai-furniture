// src/constants/index.js

export const navLinks = [
  { href: "#process", label: "Our Process" },
  { href: "#studio", label: "Design Studio" },
  { href: "#images", label: "images" },
];



export const features = [
  {
    prompt: [
      'A Scandinavian style dining table,', 1000,
      'A Scandinavian style dining table, for six people,', 1000,
      'A Scandinavian style dining table, for six people, made of light oak.', 1000,
      'A Scandinavian style dining table, for six people, made of light oak. With rounded corners and a minimalist feel.', 2500,
    ],
    title: "Designed by You",
    description: "Start with a simple description, a feeling, or a detailed specification. Our AI acts as your personal designer, translating your thoughts into a tangible concept.",
    linkText: "Learn about the AI",
  },
  {
    galleryImages: [
      { id: 1, name: 'The Minimalist Bench', imageSrc: '/images/1.jpg', material: 'Natural Ash Wood' },
      { id: 2, name: 'The Nordic Dining Table', imageSrc: '/images/2.jpg', material: 'White Oak & Steel' },
      { id: 3, name: 'The Muted Marble Table', imageSrc: '/images/3.jpg', material: 'Italian Marble & Walnut' },
      { id: 4, name: 'The Classic Oak Set', imageSrc: '/images/4.jpg', material: 'Solid European Oak' },
      { id: 5, name: 'The Industrial Frame Table', imageSrc: '/images/5.jpg', material: 'Reclaimed Pine & Iron' },
      { id: 6, name: 'The Oval Pedestal Table', imageSrc: '/images/6.jpg', material: 'Smoked American Oak' },
      { id: 7, name: 'The Sculptural Dining Set', imageSrc: '/images/7.jpg', material: 'Light Birch Wood' },
      { id: 8, name: 'The Rustic Farmhouse Table', imageSrc: '/images/8.jpg', material: 'Distressed Elm Wood' },
    ],
    title: "Refined to Perfection",
    description: "Collaborate with the AI to adjust every detail. Change dimensions, select from a library of premium woods, and test different finishes until the design is unequivocally yours.",
    linkText: "Explore Materials",
  },
  {
    image: "/images/feature-3.jpg", 
    title: "Crafted for Reality",
    description: "Once you're satisfied, we generate everything needed for construction: precise blueprints, 3D models, and a complete materials list for your chosen woodworker.",
    linkText: "See an Example Plan",
  },
];