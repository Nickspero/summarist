"use client";
import { useEffect, useState } from "react";
import "./for-you.css";
import { CiPlay1 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { BookSkeleton, SelectedSkeleton } from "../components/BookSkeleton";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

  const isPremium = useSelector((state: RootState) => state.premium.isPremium);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  return (
    <div className="wrapper">
      <Searchbar/>
      <Sidebar/>

      {/* SELECTED */}

      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            {loading ? (
              <SelectedSkeleton/>
            ) : (
              <Link href={`/book/${selectedBooks[0].id}`}>
              <div
                className="selected__book"
          
              >
                <div className="selected__book--sub-title">
                  {selectedBooks[0].subTitle}
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="book__image--wrapper">
                    <img
                      className="book__image"
                      src={selectedBooks[0].imageLink}
                      alt=""
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
              </div>
              </Link>
            )}

            {/* RECOMENDED */}
            <div className="recommended">
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you’ll like these
              </div>

              <div className="for-you__recommended">
                {loading
                  ? new Array(5).fill(0).map((_, i) => <BookSkeleton key={i} />)
                  : recommendedBooks.slice(0, 5).map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`}>
                      <div
                        className="rec__book--link"
                      >
                        {book.subscriptionRequired && (!isPremium || !isLoggedIn)? <div className="book__pill book__pill--subscription-required">Premium</div> : null}
                        <figure>
                          <img
                            className="book__image"
                            src={book.imageLink}
                            alt={book.title}
                          />
                        </figure>

                        <div className="recommended__book--title">
                          {book.title}
                        </div>
                        <div className="recommended__book--author">
                          {book.author}
                        </div>
                        <div className="recommended__book--sub-title">
                          {book.subTitle}
                        </div>

                        <div className="rec__book--details-wrapper">
                          <div className="rec__book--details">
                            <div className="rec__book--details--icon">
                              <CiClock2 />
                            </div>
                            <div className="rec__book--details-text">
                              {book.keyIdeas} key ideas
                            </div>
                          </div>

                          <div className="rec__book--details">
                            <div className="rec__book--details--icon">
                              <CiStar />
                            </div>
                            <div className="rec__book--details-text">
                              {book.averageRating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    ))}
              </div>
            </div>

            {/* SUGGESTED */}
            <div className="suggested">
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse These Books</div>
              <div className="for-you__recommended">
                {loading
                  ? new Array(5).fill(0).map((_, i) => <BookSkeleton key={i} />)
                  : suggestedBooks.slice(0, 5).map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`}>
                      <div
                        className="rec__book--link"
                      >
                        {book.subscriptionRequired && (!isPremium || !isLoggedIn)? <div className="book__pill book__pill--subscription-required">Premium</div> : null}
                        <figure>
                          <img
                            className="book__image"
                            src={book.imageLink}
                            alt={book.title}
                          />
                        </figure>

                        <div className="recommended__book--title">
                          {book.title}
                        </div>
                        <div className="recommended__book--author">
                          {book.author}
                        </div>
                        <div className="recommended__book--sub-title">
                          {book.subTitle}
                        </div>

                        <div className="rec__book--details-wrapper">
                          <div className="rec__book--details">
                            <div className="rec__book--details--icon">
                              <CiClock2 />
                            </div>
                            <div className="rec__book--details-text">
                              {book.keyIdeas} key ideas
                            </div>
                          </div>

                          <div className="rec__book--details">
                            <div className="rec__book--details--icon">
                              <CiStar />
                            </div>
                            <div className="rec__book--details-text">
                              {book.averageRating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
