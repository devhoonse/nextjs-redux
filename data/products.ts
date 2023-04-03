/**
 * 판매 제품 정보
 * * id : 제품 ID
 * * name : 제품 이름
 * * picture : 제품 이미지
 * * price : 판매 가격
 */
export type Product = {
  id: string;
  name: string;
  picture: string;
  price: number;
};

/**
 * 현재 판매 중인 제품 목록 정보
 */
const products: Product[] = [
  {
    id: '7109-a115',
    name: 'Broccoli',
    picture: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c',
    price: 2,
  },
  {
    id: '9126-b921',
    name: 'Onions',
    picture: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31',
    price: 1.5,
  },
  {
    id: '4192-p192',
    name: 'Cauliflower',
    picture: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80',
    price: 2.5,
  },
  {
    id: '8321-k532',
    name: 'Carrots',
    picture: 'https://images.unsplash.com/photo-1582515073490-39981397c445',
    price: 3.5,
  },
]
export default products;
