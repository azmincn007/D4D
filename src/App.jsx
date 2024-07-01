import React, { createContext, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Pages/Home";
import "./App.css";
import RestuarentMenu from "./Components/Restuarents/RestuarentMenu";
import Mobilessingle from "./Components/Mobile/Mobilessingle";
import Flyer from "./Pages/Flyer";
import Favouratemodal from "./Components/modal/Favouratemodal";
import BaseLayoutAuthentication from "./ShopsAdmin/Pages/Restuarent/BaseLayoutAuthentication";
import Logincomponent from "./ShopsAdmin/Components/Logincomponent";
import SignupCom from "./ShopsAdmin/Components/SignupCom";
import Signupsecond from "./ShopsAdmin/Components/forgetpassword";
import VerifyOtp from "./ShopsAdmin/Components/VerifyOtp";
import SignupDataupload from "./ShopsAdmin/Components/SignupDataupload";
import Subscription from "./ShopsAdmin/Pages/Restuarent/Subscription";
import RestuarentDashboard from "./ShopsAdmin/Pages/Restuarent/RestuarentDashboard";
import CreateSecurepassword from "./ShopsAdmin/Components/CreateSecurepass";
import ProfileShowComponent from "./ShopsAdmin/Components/ProfileShowComponent";
import Errorpage404 from "./api/Errorpage404";

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
  const [ActiveToggle, setActiveToggle] = useState("Product");

  const [Nationalities, setNationalities] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={[selectedLanguage, setSelectedLanguage]}>
        <RegionContext.Provider value={[selectedRegion, setSelectedRegion]}>
          <ToggleContext.Provider value={[ActiveToggle, setActiveToggle]}>
            <NationalityContext.Provider value={[Nationalities, setNationalities]}>
              <Countrycontext.Provider value={[selectedCountry, setSelectedCountry]}>
                <AuthContext.Provider value={[AuthValue, setAuthValue]}>
                  <Router>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/resto" element={<RestuarentMenu />} />
                      <Route path="/mobilesingle" element={<Mobilessingle />} />
                      <Route path="/flyer" element={<Flyer />} />
                      <Route path="/fav" element={<Favouratemodal />} />
                      <Route path="/404error" element={<Errorpage404 />} />
                      <Route
                        path="/loginadmin"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
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
                        path="/forgetpassword"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <Signupsecond />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/verifyotp"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <VerifyOtp />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/signupupload"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <SignupDataupload />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/securepass"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <CreateSecurepassword />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/profileshow"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <ProfileShowComponent />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route
                        path="/subscription"
                        element={
                          <BaseLayoutAuthentication
                            redVector="top-0 right-0 red-vector"
                            yellowVector="bottom-0 left-0 yellow-vector"
                            redYellowVector="top-0 right-0 red-yellow"
                          >
                            {" "}
                            <Subscription />
                          </BaseLayoutAuthentication>
                        }
                      />

                      <Route path="/Restorentdashboard" element={<RestuarentDashboard />} />
                      <Route path="*" element={<Errorpage404 />} />
                    </Routes>
                  </Router>
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
