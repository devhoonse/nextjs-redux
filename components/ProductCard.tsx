import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {CartStore} from "@/redux/store";
import {Product} from "@/data/products";

/**
 * Redux 스토어의 현재 상태를 가져옵니다.
 */
function useGlobalCart() {
  return useSelector((state: CartStore) => state, shallowEqual);
}

/**
 * 쇼핑 페이지 내 전체 제품 목록에 표현될 개별 상품 카드 컴포넌트
 * @constructor
 */
function ProductCard({ id, name, picture, price }: Product) {

  // 장바구니 컨텍스트에서 상태를 읽어옵니다.
  const dispatch = useDispatch();
  const cartStore = useGlobalCart();
  const productAmount = cartStore?.[id] ?? 0; // 장바구니에 현재 제품이 담긴 갯수

  // 카드 컴포넌트 구조
  return (
    <div className="bg-gray-200 p-6 rounded-md">
      <div className="relative 100% h-40 m-auto">
        <img className="object-cover" src={picture} alt={name}/>
      </div>
      <div className="flex justify-between mt-4">
        <div className="font-bold text-l">
          {name}
        </div>
        <div className="font-bold text-l text-gray-500">
          {price}/kg
        </div>
      </div>
      <div className="flex justify-between mt-4 w-2/4 m-auto">
        <button
          className="pl-2 pr-2 bg-red-400 text-white rounded-md"
          disabled={productAmount < 1} // todo: 비활성화 여부 제어 기능
          onClick={() => dispatch({ type: 'DECREASE', id })}
        >
          -
        </button>
        <div>{productAmount}</div>{/* todo: 구현할 부분 */}
        <button
          className="pl-2 pr-2 bg-green-400 text-white rounded-md"
          onClick={() => dispatch({ type: 'INCREASE', id })}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
