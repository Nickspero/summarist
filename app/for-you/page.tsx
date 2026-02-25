"use client";
import { useEffect, useState } from "react";
import "./for-you.css";
import { CiPlay1 } from "react-icons/ci";
import { BookSkeleton, SelectedSkeleton } from "../components/BookSkeleton";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Link from "next/link";
import Book from "../components/Book";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  audioDescription: string;
  subTitle: string;
}

export default function ForYouPage() {

  const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net/getBooks";

  const fetchAPI = async (status: string): Promise<Book[]> => {
    const res = await fetch(`${BASE_URL}?status=${status}`);
    return res.json();
  };

  const [loading, setLoading] = useState(true);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const [selected, recommended, suggested] = await Promise.all([
        fetchAPI("selected"),
        fetchAPI("recommended"),
        fetchAPI("suggested"),
      ]);

      setSelectedBooks(selected);
      setRecommendedBooks(recommended);
      setSuggestedBooks(suggested);
      setLoading(false);
    };

    loadBooks();
  }, []);


  return (
    <div className="wrapper">
      <Searchbar/>
      <Sidebar/>

      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="title">Selected just for you</div>
            {loading ? (
              <SelectedSkeleton/>
            ) : (
              <div className="selected__book">
                <Link className="selected__book--link" href={`/book/${selectedBooks[0].id}`}>
                <div className="selected__book--sub-title">
                  {selectedBooks[0].subTitle}
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="book__image--wrapper">
                    <img
                      className="book__image"
                      src={selectedBooks[0].imageLink}
                      alt={selectedBooks[0].title}
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">
                      {selectedBooks[0].title}
                    </div>
                    <div className="selected__book--author">
                      {selectedBooks[0].author}
                    </div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <CiPlay1 />
                      </div>
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              </div>
            )}

            
            <div>
              <div className="list__title">Recommended For You</div>
              <div className="list__sub-title">
                We think you’ll like these
              </div>

              <div className="section__books">
                {loading
                  ? new Array(5).fill(0).map((_, i) => <BookSkeleton key={i} />)
                  : recommendedBooks.slice(0, 5).map((book) => (
                    <Book key={book.id} id={book.id} bookObj={book} title={book.title} subtitle={book.subTitle} author={book.author} ideas={book.keyIdeas} rating={book.averageRating} img={book.imageLink} />
                    ))}
              </div>
            </div>

  
            <div>
              <div className="list__title">Suggested Books</div>
              <div className="list__sub-title">Browse These Books</div>
              <div className="section__books">
                {loading
                  ? new Array(5).fill(0).map((_, i) => <BookSkeleton key={i} />)
                  : suggestedBooks.slice(0, 5).map((book) => (
                    <Book key={book.id} id={book.id} bookObj={book} title={book.title} subtitle={book.subTitle} author={book.author} ideas={book.keyIdeas} rating={book.averageRating} img={book.imageLink} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
