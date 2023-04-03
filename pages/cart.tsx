import {useContext} from "react";
import {shallowEqual, useSelector} from "react-redux";
import products, {Product} from "@/data/products";
import {CartStore} from "@/redux/store";

/**
 * Redux 스토어의 현재 상태를 가져옵니다.
 */
function useGlobalCart() {
  return useSelector((state: CartStore) => state, shallowEqual);
}

/**
 * 제품 ID 를 전달하면 해당 제품의 전체 정보를 반환합니다.
 * @param id
 */
function getItemInfo(id: Product['id']) {
  return products.find(product => product.id === id);
}

/**
 * 페이지 : /cart
 * @constructor
 */
function Cart() {

  // 장바구니 컨텍스트에서 items 상태를 읽어옵니다.
  const cartStore = useGlobalCart();

  /**
   * 현재 장바구니에 담긴 제품들의 전체 금액 합계
   */
  const totalPrice = Object.keys(cartStore)
    .map(id => getItemInfo(id))
    .reduce((previousValue, currentValue) => previousValue + (currentValue?.price || 0), 0);

  /**
   * 횬쟈 장바구니에 담긴 제품들의 정보 정리
   */
  const cartSummary = Object.keys(cartStore)
    .map(id => ({
      itemInfo: getItemInfo(id),
      amount: cartStore?.[id] ?? 0
    }));

  // 페이지 컴포넌트 구조
  return (
    <div>
      <h1 className="text-xl font-bold">
        Total: ${totalPrice}
      </h1>
      <div>
        {cartSummary.map(({ itemInfo, amount }, index) => (
          <div key={index}>
            x{amount} {itemInfo?.name} (${amount * (itemInfo?.price || 1)})
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;
