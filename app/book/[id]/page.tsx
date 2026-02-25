"use client";
import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import "../book-page.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CiStar } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { CiMicrophoneOn } from "react-icons/ci";
import { PiLightbulbFilament } from "react-icons/pi";
import { PiBookOpenText } from "react-icons/pi";
import Link from "next/link";
import { BookPageSkeleton } from "@/app/components/BookSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LibraryToggle from "@/app/components/LibraryToggle";

const bookPage = () => {
  const [bookInfo, setBookInfo] = useState<any>(null);
  const params = useParams();
  const id = params.id as string;

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isPremium = useSelector((state: RootState) => state.premium.isPremium);

  useEffect(() => {
    const fetchBookInfo = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
      );
      const data = await res.json();
      setBookInfo(data);
    };
    fetchBookInfo();
  }, []);

  return (
    <div className="wrapper">
      <Searchbar />
      <Sidebar />
      <div className="row">
        <div className="container">
          {bookInfo ? (
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="inner-book__title">{bookInfo.title}{bookInfo.subscriptionRequired && (!isPremium || !isLoggedIn) && " (Premium)"}</div>
                <div className="inner-book__author">{bookInfo.author}</div>
                <div className="inner-book__sub-title">{bookInfo.subTitle}</div>
                <div className="inner-book__wrapper">
                  <div className="inner-book__description--wrapper">
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <CiStar />
                      </div>
                      <div className="inner-book__description--text">
                        {bookInfo.averageRating} ({bookInfo.totalRating}{" "}
                        Ratings)
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <CiClock1 />
                      </div>
                      <div className="inner-book__description--text">4:27</div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <CiMicrophoneOn />
                      </div>
                      <div className="inner-book__description--text">
                        {bookInfo.type}
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <PiLightbulbFilament />
                      </div>
                      <div className="inner-book__description--text">
                        {bookInfo.keyIdeas} Key Ideas
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inner-book__read--btn-wrapper">
                  <Link
                    href={
                      isPremium || !bookInfo.subscriptionRequired
                        ? `/player/${id}`
                        : "/choose-plan"
                    }
                  >
                    <button className="inner-book__read--btn">
                      <div className="inner-book__read--icon">
                        <PiBookOpenText />
                      </div>
                      <div className="inner-book__read--text">Read</div>
                    </button>
                  </Link>
                  <Link
                    href={
                      isPremium || !bookInfo.subscriptionRequired
                        ? `/player/${id}`
                        : "/choose-plan"
                    }
                  >
                    <button className="inner-book__read--btn">
                      <div className="inner-book__read--icon">
                        <CiMicrophoneOn />
                      </div>
                      <div className="inner-book__read--text">Listen</div>
                    </button>
                  </Link>
                </div>
                <LibraryToggle bookInfo={bookInfo}/>
                <h2 className="inner-book__secondary--title">
                  What's it about?
                </h2>
                <div className="inner-book__tags--wrapper">
                  {bookInfo.tags.map((tag: string) => (
                    <div key={tag} className="inner-book__tag">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="inner-book__book--description">
                  {bookInfo.bookDescription}
                </div>
                <h2 className="inner-book__secondary--title">
                  About the author
                </h2>
                <div className="inner-book__author--description">
                  {bookInfo.authorDescription}
                </div>
              </div>

              <div className="inner-book--img-wrapper">
                <figure className="book__image--wrapper">
                  <img
                    className="book__image"
                    src={bookInfo.imageLink}
                    alt=""
                  />
                </figure>
              </div>
            </div>
          ) : (
            <BookPageSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default bookPage;
