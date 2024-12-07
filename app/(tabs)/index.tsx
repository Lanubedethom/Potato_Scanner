import React, { useState, useEffect } from "react";
import { StatusBar, View, useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Home from "../../components/PotatoScanner/Home";
import History from "../../components/PotatoScanner/History";
import Footer from "../../components/PotatoScanner/Footer";
import Settings from "../../components/PotatoScanner/Settings";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'PacificoRegular': require('../../assets/fonts/PacificoRegular.ttf'),
    'InterRegular': require('../../assets/fonts/Inter18ptMedium.ttf'),
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [newEntry, setNewEntry] = useState(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const updateHistory = (entry: any) => {
    setNewEntry(entry);
  };

  let pageComponent;
  if (currentPage === "home") {
    pageComponent = <Home updateHistory={updateHistory} />;
  } else if (currentPage === "clock") {
    pageComponent = <History newEntry={newEntry} />;
  } else if (currentPage === "settings") {
    pageComponent = <Settings />;
  }

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="#ffffff" />
      {pageComponent}
      <Footer currentPage={currentPage} setCurrentPage={handleNavigate} />
    </NativeBaseProvider>
  );
}
