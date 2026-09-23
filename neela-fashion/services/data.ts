import { Product } from '../types';

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let idCounter = 1;

  products.push({
    id: idCounter++,
    name: `Purple Floral Mul Cotton Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1999,
    image: "/original_chudidar_1.jpg",
    images: ["/original_chudidar_1.jpg"],
    description: `Soft Mul cotton\nTop: 2.5 m neck cut work and patch work design\nBottom: 2 m`,
    material: 'Soft Mul Cotton',
    rating: 4.8,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Green Floral Mul Cotton Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1999,
    image: "/original_chudidar_2.jpg",
    images: ["/original_chudidar_2.jpg"],
    description: `Soft Mul cotton\nTop: 2.5 m neck cut work and patch work design\nBottom: 2 m`,
    material: 'Soft Mul Cotton',
    rating: 4.9,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Pink Floral Mul Cotton Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1999,
    image: "/original_chudidar_3.jpg",
    images: ["/original_chudidar_3.jpg"],
    description: `Soft Mul cotton\nTop: 2.5 m neck cut work and patch work design\nBottom: 2 m`,
    material: 'Soft Mul Cotton',
    rating: 4.9,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Black Mul Cotton Embroidery Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1399,
    image: "/black_embroidery_suit.jpg",
    images: ["/black_embroidery_suit.jpg"],
    description: `Top: 2.5 m Mul cotton with neck and buttons embroidery work\nBottom: 2 m with embroidery work\nDuppata: 2.5 m with full embroidery work`,
    material: 'Mul Cotton',
    rating: 4.8,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Blue Mul Cotton Embroidery Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1399,
    image: "/blue_embroidery_suit.jpg",
    images: ["/blue_embroidery_suit.jpg"],
    description: `Top: 2.5 m Mul cotton with neck and buttons embroidery work\nBottom: 2 m with embroidery work\nDuppata: 2.5 m with full embroidery work`,
    material: 'Mul Cotton',
    rating: 4.9,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Black Floral Katha Stitch Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1799,
    image: "/katha_stitch_1.jpg",
    images: ["/katha_stitch_1.jpg"],
    description: `Top: 2.5 m Soft Mul cotton with full Katha stitch work\nBottom: 2 m full chickenkari work\nDuppata: 2.5 m Soft Mul cotton with cut work and patch work design`,
    material: 'Soft Mul Cotton',
    rating: 4.8,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Green Floral Katha Stitch Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1799,
    image: "/katha_stitch_2.jpg",
    images: ["/katha_stitch_2.jpg"],
    description: `Top: 2.5 m Soft Mul cotton with full Katha stitch work\nBottom: 2 m full chickenkari work\nDuppata: 2.5 m Soft Mul cotton with cut work and patch work design`,
    material: 'Soft Mul Cotton',
    rating: 4.9,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Olive Paisley Katha Stitch Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1799,
    image: "/katha_stitch_3.jpg",
    images: ["/katha_stitch_3.jpg"],
    description: `Top: 2.5 m Soft Mul cotton with full Katha stitch work\nBottom: 2 m full chickenkari work\nDuppata: 2.5 m Soft Mul cotton with cut work and patch work design`,
    material: 'Soft Mul Cotton',
    rating: 4.7,
    stock: 20
  });

  products.push({
    id: idCounter++,
    name: `Pink Floral Katha Stitch Suit`,
    category: 'Cotton Sets',
    subCategory: 'Unstitched Suits',
    price: 1799,
    image: "/katha_stitch_4.jpg",
    images: ["/katha_stitch_4.jpg"],
    description: `Top: 2.5 m Soft Mul cotton with full Katha stitch work\nBottom: 2 m full chickenkari work\nDuppata: 2.5 m Soft Mul cotton with cut work and patch work design`,
    material: 'Soft Mul Cotton',
    rating: 4.9,
    stock: 20
  });

  return products;
};

export const MOCK_PRODUCTS = generateProducts();

export const getProductById = (id: number): Product | undefined => {
  return MOCK_PRODUCTS.find(p => p.id === id);
};

export const getRelatedProducts = (category: string, currentId: number): Product[] => {
  return MOCK_PRODUCTS.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
};
