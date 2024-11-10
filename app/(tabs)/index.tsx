import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Home from "../../components/PotatoScanner/Home";
import History from "../../components/PotatoScanner/History";
import Footer from "../../components/PotatoScanner/Footer";
import Settings from "../../components/PotatoScanner/Settings";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [newEntry, setNewEntry] = useState(null);
  const [loaded, error] = useFonts({
    'Pacifico': require('../../assets/fonts/PacificoRegular.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter18ptMedium.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const updateHistory = (entry: any) => {
    setNewEntry(entry);
  };

  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {currentPage === "home" && <Home updateHistory={updateHistory} />}
      {currentPage === "clock" && <History newEntry={newEntry} />}
      {currentPage === "settings" && <Settings />}
      <Footer currentPage={currentPage} setCurrentPage={handleNavigate} />
    </NativeBaseProvider>
  );
}