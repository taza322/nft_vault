import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from "notistack";

// pages
import Main from "./pages/Main.js";
import NFT from "./pages/NFT.js";
import JSON from "./pages/JSON.js";

// components
import TabSelector from "./components/TabSelector.js";
import Header from "./components/Header.js";
import Loading from "./components/Loading.js";
import Snackbar from "./components/Snackbar.js";

// recoil
import { useRecoilValue } from "recoil";
import { loadingState } from "./recoil/loading.js";
import { addressState } from "./recoil/account.js";

function App() {
  const isLoading = useRecoilValue(loadingState);
  const { address } = useRecoilValue(addressState);

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Header />
        {isLoading.isLoading ? <Loading /> : null}
        {address.length === 0 ? null : <TabSelector />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Json" element={<JSON />} />
          <Route path="/NFT" element={<NFT />} />
        </Routes>
        <Snackbar />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
