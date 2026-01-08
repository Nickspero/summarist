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
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/authSlice";
import { RootState } from "../redux/store";
import Modal from "./Modal";
import { open } from "../redux/modalSlice";
import "./componentStyles/Sidebar.css"

const Sidebar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isModalOpen = useSelector((state: RootState) => state.modal.value);

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
  };

  const handleLogin = () => {
    dispatch(open());
  };


  return (
    <div className="sidebar">
      <div className="logo">
        <img className="logo__img" src="/logo.png" alt="" />
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <a className="sidebar__link" href="/for-you">
            <div className="sidebar__icon">
              <CiHome />
            </div>
            <div className="sidebar__title">For you</div>
          </a>
          <a className="sidebar__link disabled" href="/for-you">
            <div className="sidebar__icon">
              <CiBookmark />
            </div>
            <div className="sidebar__title">My Library</div>
          </a>
          <a className="sidebar__link disabled" href="/for-you">
            <div className="sidebar__icon">
              <CiEdit />
            </div>
            <div className="sidebar__title">Highlights</div>
          </a>
          <a className="sidebar__link disabled" href="/for-you">
            <div className="sidebar__icon">
              <CiSearch />
            </div>
            <div className="sidebar__title disabled">Search</div>
          </a>
        </div>

        <div className="sidebar__bottom">
          <a className="sidebar__link" href="/settings">
            <div className="sidebar__icon">
              <CiSettings />
            </div>
            <div className="sidebar__title">Settings</div>
          </a>
          <a className="sidebar__link disabled" href="/for-you">
            <div className="sidebar__icon">
              <CiCircleQuestion />
            </div>
            <div className="sidebar__title">Help</div>
          </a>

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
      {isModalOpen && <Modal />}
    </div>
  );
};

export default Sidebar;
