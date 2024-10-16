import React, { createContext, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Pages/Home";
import "./App.css";
import RestuarentMenu from "./Components/RestuarentsorShop/RestuarentMenu";
import Mobilessingle from "./Components/Mobile/Shoppage";
import Flyer from "./Pages/Flyer";
import Favouratemodal from "./Components/modal/Favouratemodal";
import BaseLayoutAuthentication from "./ShopsAdmin/Pages/Restuarent/BaseLayoutAuthentication";
import Logincomponent from "./ShopsAdmin/Components/Logincomponent";
import SignupCom from "./ShopsAdmin/Components/SignupCom";
import Signupsecond from "./ShopsAdmin/Components/forgetpassword";
import VerifyOtp from "./ShopsAdmin/Components/VerifyOtp";
import SignupDataupload from "./ShopsAdmin/Components/SignupDataupload";
import Subscription from "./ShopsAdmin/Pages/Restuarent/Subscription";
import RestuarentDashboard from "./ShopsAdmin/Pages/Restuarent/Dashboard";
import CreateSecurepassword from "./ShopsAdmin/Components/CreateSecurepass";
import ProfileShowComponent from "./ShopsAdmin/Components/ProfileShowComponent";
import Errorpage404 from "./api/Errorpage404";
import ShopMenu from "./Components/RestuarentsorShop/ShopMenu";
import Shoppage from "./Components/Mobile/Shoppage";
import Layout from "./Layout";

export const AuthContext = createContext();
export const Countrycontext = createContext();
export const NationalityContext = createContext();
export const ToggleContext = createContext();
export const RegionContext = createContext();
export const LanguageContext = createContext();
export const SelectionContext = createContext();
export const SelectedCategoryContext = createContext();
export const SelectedSubCategoryContext = createContext();
export const LoginContext = createContext();
export const UseridContext = createContext();
export const FavCountContext = createContext();
export const OfferContext = createContext();
export const SearchContext = createContext();
export const showFavmodal = createContext();

const queryClient = new QueryClient();

function App() {
  const [AuthValue, setAuthValue] = useState("login");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedValue, setSelectedValue] = useState("Shops");
  const [ActiveToggle, setActiveToggle] = useState("Product");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [FavCount, SetFavCount] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(1);
  const [showSearchProducts, setShowSearchProducts] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [Userid, setUserid] = useState(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? parseInt(storedUserId, 10) : 0;
  });

  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserid(parseInt(storedUserId, 10));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [Nationalities, setNationalities] = useState([]);

  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <showFavmodal.Provider value={[showFavoriteModal, setShowFavoriteModal]}>
        <SearchContext.Provider
          value={{
            showSearchProducts,
            setShowSearchProducts,
            searchResults,
            setSearchResults,
          }}
        >
          <OfferContext.Provider value={{ selectedOfferId, setSelectedOfferId }}>
            <FavCountContext.Provider value={[FavCount, SetFavCount, showFavorites, setShowFavorites]}>
              <UseridContext.Provider value={[Userid, setUserid]}>
                <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                  <SelectedSubCategoryContext.Provider value={{ selectedSubCategoryId, setSelectedSubCategoryId }}>
                    <SelectedCategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
                      <SelectionContext.Provider value={[selectedValue, setSelectedValue]}>
                        <LanguageContext.Provider value={[selectedLanguage, setSelectedLanguage]}>
                          <RegionContext.Provider value={[selectedRegion, setSelectedRegion]}>
                            <ToggleContext.Provider value={[ActiveToggle, setActiveToggle]}>
                              <NationalityContext.Provider value={[Nationalities, setNationalities]}>
                                <Countrycontext.Provider value={[selectedCountry, setSelectedCountry]}>
                                  <AuthContext.Provider value={[AuthValue, setAuthValue]}>
                                    <Router>
                                      <Layout onFavoriteClick={handleFavoriteClick}>
                                        <Routes>
                                          <Route path="/" element={<Home />} />
                                          <Route path="/Shop-page/:productId" element={<Shoppage />}>
                                            <Route path="flyer/:id" element={<Flyer />} />
                                          </Route>

                                          <Route path="/restuarent" element={<RestuarentMenu />} />
                                          <Route path="/shop" element={<ShopMenu />} />

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
                                      </Layout>
                                    </Router>
                                  </AuthContext.Provider>
                                </Countrycontext.Provider>
                              </NationalityContext.Provider>
                            </ToggleContext.Provider>
                          </RegionContext.Provider>
                        </LanguageContext.Provider>
                      </SelectionContext.Provider>
                    </SelectedCategoryContext.Provider>
                  </SelectedSubCategoryContext.Provider>
                </LoginContext.Provider>
              </UseridContext.Provider>
            </FavCountContext.Provider>
          </OfferContext.Provider>
        </SearchContext.Provider>
      </showFavmodal.Provider>
    </QueryClientProvider>
  );
}

export default App;
