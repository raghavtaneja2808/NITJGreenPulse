import p1 from "./6-8frame.jpg";
import p2 from "./collage12.jpg";
import p3 from "./cup.jpg";
import p4 from "./frame.webp";
import p5 from "./frame2.jpg";
import p6 from "./frame3.jpg";
import p7 from "./frame4.jpg";
import p8 from "./tshirt.jpg";
import p9 from "./keyring.webp";
import p10 from "./scenary.webp"
import logo from "./logo.png"; 
import search_icon from "./search_icon.jpg"; 
import cart_icon from "./cart-icon.png"; 

export const assets = {
    logo,
    search_icon,
    cart_icon,
};

export const products = [
    { p_name: "Fungicides", p_image: p1 ,category:"Fungicides"},
    { p_name: "Insecticides", p_image: p2 ,category:"Insecticides"},
    { p_name: "Nematicides", p_image: p3,category:"Nematicides" },
    {p_name:"Bactericides",p_image:p10,category:"Bactericides"},
    { p_name: "Virucides", p_image: p8 ,category:"Virucides"},
];
export const itemlist = [
  {
    _id: "1",
    name: "Fungicide",
    image: p1,
    price: 300,
    description: "prevent, control, or eliminate fungal infections in plants",
    fulldetail: "This elegant frame is made from high-quality wood, perfect for displaying your cherished photo. The smooth surface gives it a premium feel, and its minimalist design ensures it blends well with any home decor. The frame features a sturdy base and is perfect for your tabletop or office desk.",
    size: "8x10 inches",
    category: "Frame",
  },
  {
    _id: "2",
    name: "Insectides",
    image: p2,
    price: 500,
    description: " control, repel, or kill insects that are considered pests.",
    fulldetail: "Our collage frame is crafted with love and precision. It's made from premium wood and designed to fit multiple photos of varying sizes. The frame's modern design adds a creative touch to your living space, and its versatility allows you to arrange your photos in any order you like.",
    size: "12x16 inches",
    category: "Collage",
  },
  {
    _id: "3",
    name: "Nematicides",
    image: p3,
    price: 250,
    description: " control nematodes, which are microscopic, parasitic roundworms",
    fulldetail: "This ceramic cup is perfect for your morning coffee or tea. It is customizable, allowing you to add your favorite design or text. The cup is made from durable ceramic, with a smooth finish that’s easy to clean. Whether you’re sipping your morning coffee or enjoying a hot beverage, this cup adds a personal touch.",
    size: "Medium",
    category: "Custom Cup",
  },
  {
    _id: "5",
    name: "Bactericides",
    image: p10,
    price: 400,
    description: " kill or inhibit the growth of bacteria",
    fulldetail: "This piece of art features a breathtaking landscape, printed on premium-quality canvas. The rich colors and intricate details make it a perfect addition to your home or office. The frame adds a refined touch, making it ready to hang and showcase your love for nature.",
    size: "24x36 inches",
    category: "Scenery",
  },
  {
    _id: "6",
    name: "Virucide",
    image: p8,
    price: 700,
    description: " control the spread of plant viruses ",
    fulldetail: "This t-shirt is made from soft cotton fabric, ensuring maximum comfort and breathability. It's designed to fit your body perfectly, with a personalized touch. Whether you're looking for a graphic design or a simple text, this t-shirt is a great way to express yourself and stay stylish.",
    size: "Medium (fits most body types)",
    category: "T-shirt",
  },

  {
    _id: "8",
    name: "Virucide",
    image: p5,
    price: 375,
    description: " control the spread of plant viruses ",
    fulldetail: "This elegant wooden frame is designed with precision and care. It features a warm, natural finish that adds a rustic yet sophisticated look to any space. The frame is ideal for showcasing your favorite photograph, turning any room into a personal gallery.",
    size: "11x14 inches",
    category: "Frame",
  },

  {
    _id: "10",
    name: "Fungicide",
    image: p7,
    price: 300,
    description: "Prevent, control, or eliminate fungal infections in plants",
    fulldetail: "Crafted with high-end materials, this frame is designed to make your most precious memories stand out. The elegant finish and sleek design make it the perfect accessory for your living room, office, or bedroom. It’s ideal for larger photos or art pieces that deserve a premium display.",
    size: "16x20 inches",
    category: "Frame",
  }
];

  