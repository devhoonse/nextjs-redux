import {useMemo} from "react";
// import {configureStore} from "@reduxjs/toolkit";
import {Product} from "@/data/products";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

/**
 * 현재 장바구니에 담긴 품목 데이터 관리 구조 { "품목 ID" : 갯수 }
 */
export type CartItems = Record<string, number>;

/**
 * 장바구니 상태 초기값
 */
export const cartInitialState: CartItems = {};

/**
 * 어플리케이션 전역 상태 관리에 사용되는 Redux 스토어 객체에 대한 참조입니다.
 */
export type CartStore = ReturnType<typeof initStore>;
let store: CartStore | undefined;

/**
 * 장바구니 상태 변경 액션 타입
 * * id : 작업 대상 품목 ID
 * * type : 해야 할 작업
 */
type CartReducerAction = {
  id: Product['id'];
  type: 'INCREASE' | 'DECREASE';
};

/**
 * 장바구니 상태 변경 동작들을 정의하는 Reducer 함수입니다.
 * @param state
 * @param action
 */
function reducer(state = cartInitialState, action: CartReducerAction) {

  // 장바구니 내에서 변경 작업을 수행하려는 품목 ID 를 확인합니다.
  const productId = action.id;

  // 장바구니 상태 변경 액션 타입에 따라 다른 처리를 수행합니다.
  switch (action.type) {
    case "INCREASE": // 증가 시 장바구니에 처음 담는 품목은 1 로 기록하고, 이미 담은 적 있으면 +1 상태로 기록합니다.
      const newItemAmount = !(productId in state) ? 1 : state[productId] + 1;
      return {
        ...state,
        [productId]: newItemAmount
      };
    case "DECREASE":
      if (state?.[productId] > 0) { // 감소 시 기존 값이 0 이상이면 차감된 상태로 변환합니다.
        return {
          ...state,
          [productId]: state[productId] - 1
        };
      }
      return state; // 감소 시 기존 값이 0 이하이면 기존 상태를 그대로 반환합니다.
    default:
      return state;
  }
}

/**
 * Redux 스토어 객체를 새로 생성합니다.
 * @param preloadedState
 */
function initStore(preloadedState = cartInitialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
  // fixme: createStore 는 Deprecated 되었습니다. 대신 configureStore 로 변경해야 합니다.
  // return configureStore({
  //   reducer,
  //   preloadedState,
  //   devTools: process.env.NODE_ENV !== 'production'
  // });
}

/**
 * Redux 스토어를 초기화합니다.
 * @param preloadedState
 */
export function initializeStore(preloadedState?: CartItems) {

  // 기존에 생성된 Redux 스토어가 있으면 그대로 사용하고, 없으면 새로 생성합니다.
  let _store = store ?? initStore(preloadedState);

  // 적용해야 할 기존 설정이 있고, 기존에 생성된 Redux 스토어가 있으면 실행합니다.
  if (preloadedState && store) {
    _store = initStore({ // 적용해야 할 기존 설정이 적용된 Redux 스토어로 다시 만듭니다.
      ...store.getState(),
      ...preloadedState
    });
    store = undefined; // 이어지는 후속 처리를 위해, store 객체를 비웁니다.
  }

  // Redux 스토어 초기화 동작이 서버 측에서 실행되는 경우, 방금 생성한 _store 를 바로 반환합니다.
  if (typeof window === 'undefined') return _store;

  // store 객체를 기존에 생성한 적이 없으면, 방금 생성한 _store 를 store 에 할당합니다.
  if (!store) store = _store;

  // 방금 생성한 _store 객체를 반환합니다.
  return _store;
}

/**
 * 어플리케이션 상태 관리를 위해 Redux 를 사용하기 위한 초기화 과정을 실행합니다.
 * @param initialState
 */
export function useStore(initialState: CartItems) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
