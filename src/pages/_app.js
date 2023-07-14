import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@/theme";
import { createEmotionCache } from "@/utils/create-emotion-cache";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Emergency Fund App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        <ThemeProvider theme={createTheme()}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
