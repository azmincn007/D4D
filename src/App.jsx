import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RestuarentMenu from "./Components/Restuarents/RestuarentMenu";
import Mobilessingle from "./Components/Mobile/Mobilessingle";
import Flyer from "./Pages/Flyer";
import Favouratemodal from "./Components/modal/Favouratemodal";
import BaseLayoutAuthentication from "./ShopsAdmin/Pages/Restuarent/BaseLayoutAuthentication";
import Logincomponent from "./ShopsAdmin/Components/Logincomponent";
import { QueryClient, QueryClientProvider } from "react-query";
import Bahrain from "./assets/Countrylogo/Bahrain.png";
import Egypt from "./assets/Countrylogo/Egypt.png";
import India from "./assets/Countrylogo/india.png";
import Kuwait from "./assets/Countrylogo/Kuwait.png";
import Oman from "./assets/Countrylogo/Oman.png";
import Qatar from "./assets/Countrylogo/qatar.png";
import Saudi from "./assets/Countrylogo/Saudi.png";
import Uae from "./assets/Countrylogo/Uae.png";
import SignupCom from "./ShopsAdmin/Components/SignupCom";
import Signupsecond from "./ShopsAdmin/Components/Signupsecond";
import VerifyOtp from "./ShopsAdmin/Components/VerifyOtp";
import SignupDataupload from "./ShopsAdmin/Components/SignupDataupload";
import Subscription from "./ShopsAdmin/Pages/Restuarent/Subscription";
import RestuarentDashboard from "./ShopsAdmin/Pages/Restuarent/RestuarentDashboard";

export const AuthContext = createContext();
export const Countrycontext = createContext();
export const NationalityContext = createContext();
export const ToggleContext = createContext();
export const RegionContext = createContext();
export const LanguageContext = createContext();

const queryClient = new QueryClient();

function App() {
  const [AuthValue, setAuthValue] = useState("login");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const Nationalities = [
    { Country: "Bahrain", Img: Bahrain },
    { Country: "Uae", Img: Uae },
    { Country: "Saudi", Img: Saudi },
    { Country: "Egypt", Img: Egypt },
    { Country: "Oman", Img: Oman },
    { Country: "India", Img: India },
    { Country: "Qatar", Img: Qatar },
    { Country: "Kuwait", Img: Kuwait },
  ];
  const [ActiveToggle, setActiveToggle] = useState("Product");

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={[selectedLanguage, setSelectedLanguage]}>
        <RegionContext.Provider value={[selectedRegion, setSelectedRegion]}>
          <ToggleContext.Provider value={[ActiveToggle, setActiveToggle]}>
            <NationalityContext.Provider value={Nationalities}>
              <Countrycontext.Provider value={[selectedCountry, setSelectedCountry]}>
                <AuthContext.Provider value={[AuthValue, setAuthValue]}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/resto" element={<RestuarentMenu />} />
                      <Route path="/mobilesingle" element={<Mobilessingle />} />
                      <Route path="/flyer" element={<Flyer />} />
                      <Route path="/fav" element={<Favouratemodal />} />
                      <Route
                        path="/loginadmin"
                        element={
                          <BaseLayoutAuthentication redVector="top-0 right-0 red-vector" yellowVector="bottom-0 left-0 yellow-vector">
                            <Logincomponent />
                          </BaseLayoutAuthentication>
                        }
                      />
                      <Route
                        path="/signup"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            <SignupCom />
                          </BaseLayoutAuthentication>
                        }
                      />
                      <Route
                        path="/signupsecond"
                        element={
                          <BaseLayoutAuthentication redVector={false} yellowVector={false}>
                            <Signupsecond />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/verifyotp"
                        element={
                          <BaseLayoutAuthentication redVector={false} yellowVector={false}>
                            <VerifyOtp />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/signupupload"
                        element={
                          <BaseLayoutAuthentication redVector={false} yellowVector={false}>
                            <SignupDataupload />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/subscription"
                        element={
                          <BaseLayoutAuthentication redVector={false} yellowVector={false}>
                            <Subscription />
                          </BaseLayoutAuthentication>
                        }
                      />

<Route
                        path="/Restorentdashboard"
                        element={
                            <RestuarentDashboard />
                        }
                      />
                    </Routes>
                  </BrowserRouter>
                </AuthContext.Provider>
              </Countrycontext.Provider>
            </NationalityContext.Provider>
          </ToggleContext.Provider>
        </RegionContext.Provider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
