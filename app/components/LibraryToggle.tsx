import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/init";
import { useState } from "react";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";

const LibraryToggle = ({bookInfo}:any) => {
  const [checked, setChecked] = useState(false);

const checkLibrary = async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const libraryRef = collection(db, "users", user.uid, "library");
    const snapshot = await getDocs(libraryRef);
    const exists = snapshot.docs.some(doc => doc.data().id === bookInfo.id);
    setChecked(exists);
};

  const addToLibrary = async (bookInfo: any) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to save a book!");
      return;
    }

    try {
      const bookCol = doc(
        collection(db, "users", user.uid, "library"),
        bookInfo.id,
      );
      await setDoc(bookCol, {
        title: bookInfo.title,
        author: bookInfo.author,
        imageLink: bookInfo.imageLink,
        id: bookInfo.id,
        rating: bookInfo.averageRating,
        subtitle: bookInfo.subTitle,
        ideas: bookInfo.keyIdeas,
      });
      setChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromLibrary = async (bookInfo: any) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to save a book!");
      return;
    }

    try {
      const deleteBook = doc(db, "users", user.uid, "library", bookInfo.id);
      await deleteDoc(deleteBook);
      setChecked(false);
    } catch (error) {
      console.log(error);
    }
  };


  checkLibrary()

  return (
    <>
      {checked ? (
        <div
          className="inner-book__bookmark"
          onClick={() => deleteFromLibrary(bookInfo)}
        >
          <div className="inner-book__bookmark--icon">
            <CiBookmarkCheck className="bmark__icon" />
          </div>
          <div className="inner-book__bookmark--text">
            Remove from My Library
          </div>
        </div>
      ) : (
        <div
          className="inner-book__bookmark"
          onClick={() => addToLibrary(bookInfo)}
        >
          <div className="inner-book__bookmark--icon">
            <CiBookmark className="bmark__icon" />
          </div>
          <div className="inner-book__bookmark--text">
            Add title to My Library
          </div>
        </div>
      )}
    </>
  );
};

export default LibraryToggle;
