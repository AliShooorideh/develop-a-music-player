import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import "@public/styles/globals.css";
import { Provider } from "@/public/stores";
export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <Provider>
        <main>
          <Component {...pageProps} />
        </main>
      </Provider>
    );
  }
}
