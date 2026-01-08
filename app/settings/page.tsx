"use client"
import Searchbar from "../components/Searchbar"
import Sidebar from "../components/Sidebar"
import "./settings.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { open } from "../redux/modalSlice";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";


const settingsPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isPremium = useSelector((state: RootState) => state.premium.isPremium);
  const dispatch = useDispatch()
  const [emailAddress, setEmail] = useState<string | null>(null);

  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setEmail(user.email);
    }
  });

  return () => unsubscribe();
}, []);

 const isAnonLoggedIn = useSelector((state: RootState) => state.anon.value);
console.log(isAnonLoggedIn)

  return (
    <>
    <div className="wrapper">
    <Sidebar/>
    <Searchbar/>
    <div className="row">
      <div className="container">
        <div className="section__title page__title">Settings</div>
        {isLoggedIn? <>
        <div className="setting__content">
            <div className="settings__sub--title">Your Subscription plan</div>
            {isPremium? <><div className="settings__text">Premium</div></> : <> <div className="settings__text">Basic</div>
            <a className="btn settings__upgrade--btn" href="/choose-plan">Upgrade to premium</a></>}
           
        </div>
        <div className="setting__content">
            <div className="settings__sub--title">Email</div>
            <div className="settings__text">{emailAddress || "E-mail"}</div>
        </div>
      </>
      : 
      <div className="settings__login--wrapper">
      <img className="login__img" src="/login.png"></img>
      <div className="settings__login--text">Log in to your account to see your details.</div>
        <button className="btn settings__btn" onClick={()=> dispatch(open())}>Login</button>
      </div>
      }
      </div>
      
    </div>

    </div>
    </>
  )
}

export default settingsPage
