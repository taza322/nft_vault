import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from "notistack";

// pages
import Main from "./pages/Main.js";
import NFT from "./pages/NFT.js";
import JSON from "./pages/JSON.js";
import Done from "./pages/Done.js";

// components
import TabSelector from "./components/TabSelector.js";
import Header from "./components/Header.js";
import Loading from "./components/Loading.js";
import Snackbar from "./components/Snackbar.js";

// recoil
import { useRecoilValue } from "recoil";
import { loadingState } from "./recoil/loading.js";
import { successState } from "./recoil/success.js";

function App() {
  const isLoading = useRecoilValue(loadingState);
  const isSuccess = useRecoilValue(successState);

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Header />
        {isLoading.isLoading ? <Loading /> : null}
        {isSuccess.isSuccess ? null : <TabSelector />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Json" element={<JSON />} />
          <Route path="/NFT" element={<NFT />} />
          <Route path="/done" element={<Done />} />
        </Routes>
        <Snackbar />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
