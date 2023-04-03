import {Provider} from "react-redux";
import type { AppProps } from 'next/app'
import Head from "next/head";
import {cartInitialState, useStore} from "@/redux/store";
import NavBar from "@/components/NavBar";
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  // 어플리케이션 전역 상태 관리를 위해 Redux 를 사용하도록 설정합니다.
  const store = useStore(cartInitialState); // pageProps.initialReduxState

  // 전체 어플리케이션 컴포넌트 구조
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"/>
      </Head>
      <Provider store={store}>
        <NavBar />
        <div className="w-9/12 m-auto pt-10">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
