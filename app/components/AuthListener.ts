"use client"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/init"
import { useDispatch } from "react-redux"
import { setLoggedIn } from "../redux/authSlice"
import { setPremium } from "../redux/premiumSlice"
import { checkPremiumStatus } from "../firebase/checkPremium" // make this file
import { setAnonLoggedIn } from "../redux/anonSlice"

export default function AuthListener({ app } : any) {
  const dispatch = useDispatch()

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      dispatch(setLoggedIn(!!user))
       dispatch(setAnonLoggedIn(!!user?.isAnonymous))

      if (user) {
        const isPremium = await checkPremiumStatus(app)
        dispatch(setPremium(isPremium))
      } 
      if (!!user?.isAnonymous) {
        dispatch(setPremium(true));
        return;
      }
      else {
        dispatch(setPremium(false))
      }
    })
  }, [dispatch, app])

  return null
}
