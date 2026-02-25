"use client";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import "../library/library.css";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import Book from "../components/Book";
import Link from "next/link";

const page = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No user logged in");
        return;
      }

      const libraryRef = collection(db, "users", user.uid, "library");
      const snapshot = await getDocs(libraryRef);

      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedBooks(books);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="wrapper">
      <Searchbar />
      <Sidebar />
      <div className="row">
        <div className="container">
          <div className="saved__books">
            <div className="list__title">Saved Books</div>
            <div className="list__sub-title">{savedBooks.length} Items</div>
            <div className="section__books">
              {savedBooks?.map((book) => (
                <Book
                  key={book.id}
                  id={book.id}
                  bookObj={book}
                  title={book.title}
                  subtitle={book.subtitle}
                  author={book.author}
                  ideas={book.ideas}
                  rating={book.rating}
                  img={book.imageLink}
                />
              ))}
            </div>
            <Link className="btn add__more" href={"/for-you"}>
              Add Books to your Library!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
