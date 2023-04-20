import Navbar from "./components/Navbar";
import Movies from "./page/Movies";
import DetailTvSeries from "./page/DetailTvSeries"
import DetailMovies from "./page/DetailMovies"
import Login from "./components/Login";
import Home from "./page/Home"
import Payment from "./page/user/Payment"
import DropDownAdmin from "./components/DropDownAdmin"
import Profile from "./page/user/Profile"
import AddFilm from "./page/admin/AddFilm"
import Transaction from "./page/admin/Transaction"
import "./universal.css"
import Regis from "./components/Register"
import TVshow from "./page/TVshow";
import { createContext, useState, useContext, useEffect } from "react";
import DropDown from "./components/DropDown";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Film from "./page/admin/Film"
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
} from "./PrivateRoute";
import { UserContext } from "./context/userContext";
import { ModalContext } from "./context/modalContext";
import { DropdownContext } from "./context/dropdownContex";
import { ModalLoginContext } from "./context/modalLogin";
import { StatusLoginContext } from "./context/statusLoginContext";
import { UserDropDownContext } from "./context/userDropdown"
import { API, setAuthToken } from "./config/api"
import Update from "./page/admin/Update";

// import UpdateFilm from "./page/admin/UpdateFilm";


// export const ShowMenu = createContext("testt")

function App() {
  const [loginModal, setLoginModal] = useContext(ModalLoginContext)
  const [isLogins, setIsLogins] = useContext(StatusLoginContext)
  const [isRegis, setIsRegis] = useContext(ModalContext)
  const [dropDown, setDropDown] = useContext(UserDropDownContext)
  const [adminDown, setAdminDown] = useContext(DropdownContext)

  let navigate = useNavigate();
  const [userState, userDispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [state] = useContext(UserContext)

  useEffect(() => {
    if (!isLoading) {
      if (userState.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      userDispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log('check user failed : ', error);
      userDispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {isLoading ? null : (
        <>
          <div className="bg-slate-900 flex flex-col">
            <Navbar click={setLoginModal} clickRegis={setIsRegis} isLogin={isLogin} setLogin={setIsLogin} showMenu={setDropDown} adminMenu={setAdminDown} />
            {loginModal && <Login click={setLoginModal} isLogin={setIsLogins} login={isLogin} goRegis={setIsRegis} />}
            {isRegis && <Regis click={setIsRegis} goLogin={setLoginModal} />}
            {dropDown && <DropDown showMenu={setDropDown} />}
            {adminDown && <DropDownAdmin showMenu={setAdminDown} sttsShow={adminDown} />}
          </div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshow" element={<TVshow />} />
            <Route path="/Movies" element={<Movies />} />
            <Route element={<PrivateRouteLogin />} >
              <Route element={<PrivateRouteUser />} >
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/detailTvShow/" element={<DetailTvSeries />} />
                <Route path="/detailMovies/" element={<DetailMovies />} />
              </Route>
              <Route element={<PrivateRouteAdmin />} >
                <Route path="/detailTvShow-admin/" element={<DetailTvSeries />} />
                <Route path="/detailMovies-admin/" element={<DetailMovies />} />
                <Route path="/tvshow" element={<TVshow />} />
                <Route path="/Movies" element={<Movies />} />
                <Route path="/film" element={<Film />} />
                <Route path="/addfilm" element={<AddFilm />} />
                <Route path="/updatefilm/:id" element={<Update />} />
                <Route path="/transaction" element={<Transaction />} />
              </Route>
            </Route>
            <Route path="/test" element={<DropDownAdmin />} />
          </Routes>
        </>
      )}
    </div>

  );
}

export default App;
