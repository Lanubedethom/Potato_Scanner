import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from "../../components/PotatoScanner/Home";
import History from "../../components/PotatoScanner/History";
import Footer from "../../components/PotatoScanner/Footer";
import Settings from "../../components/PotatoScanner/Settings";

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [newEntry, setNewEntry] = useState(null);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const updateHistory = (entry: any) => {
    setNewEntry(entry);
  };

  return (
    <NativeBaseProvider>
      {currentPage === "home" && <Home updateHistory={updateHistory} />}
      {currentPage === "clock" && <History newEntry={newEntry} />}
      {currentPage === "settings" && <Settings />}
      <Footer currentPage={currentPage} setCurrentPage={handleNavigate} />
    </NativeBaseProvider>
  );
}