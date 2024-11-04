import { useState } from "react";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from "../../components/PotatoScanner/Home";
import History from "../../components/PotatoScanner/History.jsx";
import Footer from "../../components/PotatoScanner/Footer";

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),
  });

  const [currentPage, setCurrentPage] = useState("home");

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {currentPage === "home" ? <Home /> : <History />}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}
