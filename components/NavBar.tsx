import {shallowEqual, useSelector} from "react-redux";
import Link from "next/link";
import {CartStore} from "@/redux/store";

/**
 * Redux 스토어의 현재 상태를 가져옵니다.
 */
function useGlobalCart() {
  return useSelector((state: CartStore) => state, shallowEqual);
}

/**
 * 어플리케이션 상단 네비게이션 바 컴포넌트
 * @constructor
 */
function NavBar() {

  // 장바구니 컨텍스트에서 상태를 읽어옵니다.
  const cartStore = useGlobalCart();
  const totalItemsAmount = Object.values(cartStore).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  // 컴포넌트 구조
  return (
    <div className="w-full bg-purple-600 p-4 text-white">
      <div className="w-9/12 m-auto flex justify-between">
        <div className="font-bold">
          <Link href="/" passHref>
            My e-commerce
          </Link>
        </div>
        <div className="font-bold underline">
          <Link href="/cart" passHref>
            {totalItemsAmount} items in cart {/* 장바구니에 담은 품목 수를 표시합니다. */}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
