"use client"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toggle } from "../redux/modalSlice"
import { auth } from "../firebase/init"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously
} from "firebase/auth"
import { AiOutlineClose } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { useRouter } from "next/navigation"
import "./componentStyles/Modal.css"
import { setLoggedIn } from "../redux/authSlice"
import { setAnonLoggedIn } from "../redux/anonSlice"
import { setPremium } from "../redux/premiumSlice"

const Modal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    if (isRegister) {
      await createUserWithEmailAndPassword(auth, email, password)
    } else {
      await signInWithEmailAndPassword(auth, email, password)
    }

    dispatch(setLoggedIn(true))
    dispatch(toggle())
    router.replace("/for-you")
  } catch {
    alert("Authentication failed")
  }
}


  const handleGuestLogin = async () => {
  try {
    await signInAnonymously(auth)
    dispatch(setLoggedIn(true))
    dispatch(setAnonLoggedIn(true))
    dispatch(setPremium(true))
    dispatch(toggle())
    router.replace("/for-you")
  } catch {
    alert("Guest login failed")
  }
}

  return (
    <div className="auth__wrapper">
      <div className="auth__content">
        <div className="auth__title">
          {isRegister ? "Create an account" : "Log in to Summarist"}
        </div>

        <button className="guest__btn" onClick={handleGuestLogin}>
          <FaUser className="guest__icon" />
          Login as a Guest
        </button>

        <div className="separator"><span>or</span></div>

        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login__btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          className="no-acc__btn"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </button>

        <AiOutlineClose
          className="auth__x"
          onClick={() => dispatch(toggle())}
        />
      </div>
    </div>
  )
}

export default Modal


