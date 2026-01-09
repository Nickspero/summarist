import {
  CiHome,
  CiBookmark,
  CiEdit,
  CiSearch,
  CiSettings,
  CiLogout,
  CiLogin,
  CiCircleQuestion,
} from "react-icons/ci";
import "./componentStyles/HamburgerMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { close } from "../redux/bgrMenuSlice";
import { setLoggedIn } from "../redux/authSlice";
import { open } from "../redux/modalSlice";
import Modal from "./Modal";

const HamburgerMenu = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.value);

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
  };

  const handleLogin = () => {
    dispatch(open());
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          dispatch(close());
        }}
      ></div>
      <div className="menu">
        <div className="menu__logo">
          <img src="/logo.png" alt="" />
        </div>
        <div className="menu__wrapper">
          <div className="menu__top">
            <a className="menu__link--wrapper" href="/for-you">
              <div className="menu__icon">
                <CiHome />
              </div>
              <div className="menu__link--text">For you</div>
            </a>
            <div className="menu__link--wrapper not-allowed">
              <div className="menu__icon">
                <CiBookmark />
              </div>
              <div className="menu__link--text">My Library</div>
            </div>
            <div className="menu__link--wrapper not-allowed">
              <div className="menu__icon">
                <CiEdit></CiEdit>
              </div>
              <div className="menu__link--text">Highlights</div>
            </div>
            <div className="menu__link--wrapper not-allowed">
              <div className="menu__icon">
                <CiSearch></CiSearch>
              </div>
              <div className="menu__link--text">Search</div>
            </div>
          </div>
          <div className="menu__bottom">
            <a className="menu__link--wrapper" href="/settings">
              <div className="menu__icon">
                <CiSettings></CiSettings>
              </div>
              <div className="menu__link--text">Settings</div>
            </a>
            <div className="menu__link--wrapper not-allowed">
              <div className="menu__icon">
                <CiCircleQuestion></CiCircleQuestion>
              </div>
              <div className="menu__link--text">Help & Support</div>
            </div>
            <div className="menu__link--wrapper">
              {isLoggedIn ? (
                <button className="sidebar__link" onClick={handleLogout}>
                  <div className="sidebar__icon">
                    <CiLogout />
                  </div>
                  <div className="sidebar__title">Logout</div>
                </button>
              ) : (
                <button className="sidebar__link" onClick={handleLogin}>
                  <div className="sidebar__icon">
                    <CiLogin />
                  </div>
                  <div className="sidebar__title">Login</div>
                </button>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && <Modal />}
      </div>
    </>
  );
};

export default HamburgerMenu;
