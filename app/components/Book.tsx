import "../components/componentStyles/Book.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";
import { CiClock2, CiStar } from "react-icons/ci";

interface Props {
  bookObj: any;
  id: string;
  title: string;
  subtitle: string;
  author: string;
  img: string;
  ideas: number;
  rating: number;
}

const Book = ({
  bookObj,
  id,
  img,
  title,
  author,
  subtitle,
  ideas,
  rating,
}: Props) => {
  const isPremium = useSelector((state: RootState) => state.premium.isPremium);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Link key={id} href={`/book/${id}`}>
      <div className="book__link">
        {bookObj.subscriptionRequired && (!isPremium || !isLoggedIn) ? (
          <div className="book__pill">
            Premium
          </div>
        ) : null}
        <figure>
          <img className="book__image" src={img} alt={title} />
        </figure>

        <div className="book__title">{title}</div>
        <div className="book__author">{author}</div>
        <div className="book__sub-title">{subtitle}</div>

        <div className="book__details--wrapper">
          <div className="book__details">
            <div className="book__details--icon">
              <CiClock2 />
            </div>
            <div>{ideas} key ideas</div>
          </div>

          <div className="book__details">
            <div className="book__details--icon">
              <CiStar />
            </div>
            <div>{rating}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
