"use client";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./componentStyles/Searchbar.css";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for Books"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setIsOpen(true)}
              />
              <div className="search__icon">
                <CiSearch />
              </div>

              {isOpen && (
                <div className="search__dropdown">
                  {loading && (
                    <div className="search__item">Loading...</div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="search__item">No results found</div>
                  )}

                  {!loading &&
                    results.map((book) => (
                      <Link
                        key={book.id}
                        href={`/book/${book.id}`}
                        className="search__item search__item--result"
                        onClick={() => setIsOpen(false)}
                      >
                        <img src={book.imageLink} alt={book.title} />
                        <div>
                          <div className="search__title">{book.title}</div>
                          <div className="search__author">{book.author}</div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;


