"use client";
import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import "../player.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlayerPageSkeleton } from "@/app/components/BookSkeleton";
import AudioPlayer from "@/app/components/AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { open } from "../../redux/modalSlice";

const page = () => {
  const params = useParams();
  const id = params.id as string;
  const [bookInfo, setBookInfo] = useState<any>(null);

  useEffect(() => {
    const fetchBookInfo = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setBookInfo(data);
    };
    fetchBookInfo();
  }, []);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <div className="wrapper">
        <div className="sidebar-with-margin">
          <Sidebar />
        </div>
        <Searchbar />
        {isLoggedIn ? (
          <>
            {bookInfo ? (
              <div className="summary">
                <div className="audio__book--summary">
                  <div className="audio__book--summary-title">
                    {bookInfo.title}
                  </div>
                  <div className="audio__book--summary-text">
                    {bookInfo.summary}
                  </div>
                </div>
                <AudioPlayer
                  audioSrc={bookInfo.audioLink}
                  title={bookInfo.title}
                  author={bookInfo.author}
                  image={bookInfo.imageLink}
                />
              </div>
            ) : (
              <PlayerPageSkeleton />
            )}
          </>
        ) : (
          <div className="settings__login--wrapper">
            <img className="login__img" src="/login.png"></img>
            <div className="settings__login--text">
              Log in to your account to see your details.
            </div>
            <button
              className="btn settings__btn"
              onClick={() => dispatch(open())}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
