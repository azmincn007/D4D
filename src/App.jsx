import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Loginpopup from './Pages/Authentication/Loginpopup';
import Bahrain from './assets/Countrylogo/Bahrain.png';
import Egypt from './assets/Countrylogo/Egypt.png';
import India from './assets/Countrylogo/india.png';
import Kuwait from './assets/Countrylogo/Kuwait.png';
import Oman from './assets/Countrylogo/Oman.png';
import Qatar from './assets/Countrylogo/qatar.png';
import Saudi from './assets/Countrylogo/Saudi.png';
import Uae from './assets/Countrylogo/Uae.png';
import RestuarentMenu from './Components/Restuarents/RestuarentMenu';
import MobilefilterContainer from './Components/Mobile/MobileFilterContainer';
import Filter from './Pages/Filter';
import Mobilessingle from './Components/Mobile/Mobilessingle';

export const AuthContext = createContext();
export const Countrycontext = createContext();
export const NationalityContext = createContext();

function App() {
  const [AuthValue, setAuthValue] = useState("login");
  const [selectedCountry, setSelectedCountry] = useState('');
  const Nationalities = [
    { Country: "Bahrain", Img: Bahrain },
    { Country: "Uae", Img: Uae },
    { Country: "Saudi", Img: Saudi },
    { Country: "Egypt", Img: Egypt },
    { Country: "Oman", Img: Oman },
    { Country: "India", Img: India },
    { Country: "Qatar", Img: Qatar },
    { Country: "Kuwait", Img: Kuwait }
  ];

  return (
    <NationalityContext.Provider value={Nationalities}>
      <Countrycontext.Provider value={[selectedCountry, setSelectedCountry]}>
        <AuthContext.Provider value={[AuthValue, setAuthValue]}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/resto' element={<RestuarentMenu />} />
              <Route path='/mobilesingle' element={<Mobilessingle />} />

              <Route path='/mobfilter' element={<Filter />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </Countrycontext.Provider>
    </NationalityContext.Provider>
  );
}

export default App;