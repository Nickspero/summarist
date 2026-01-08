import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";

export const checkPremiumStatus = (app:any) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) return Promise.resolve(false);

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        resolve(snapshot.docs.length > 0);
        unsubscribe();
      },
      reject
    );
  });
};
