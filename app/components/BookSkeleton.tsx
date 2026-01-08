import "./componentStyles/Skeleton.css"

export const BookSkeleton = () => (
  <div className="rec__book--link skeleton">
    <div className="img skeleton"></div>
    <div className="line skeleton"></div>
    <div className="short skeleton"></div>
  </div>
);

export const SelectedSkeleton = () => (
  <div className="selected skeleton"></div>
);

export const BookPageSkeleton = () => (
  <>
  <div className="book__page--skeleton">
    <div className="book__content">
    <div className="title skeleton"></div>
    <div className="sub skeleton"></div>
    <div className="sub skeleton"></div>
    <div className="book__description">
      <div className="description skeleton"></div>
      <div className="description skeleton"></div>
      <div className="description skeleton"></div>
      <div className="description skeleton"></div>
    </div>
    <div className="book__btns">
      <div className="book__btn skeleton"></div>
      <div className="book__btn skeleton"></div>
    </div>
    <div className="book__summary skeleton"></div>
    </div>
    <div className="book__img skeleton"></div>
  </div>
  </>
)

export const PlayerPageSkeleton = () => (
  <div className="audio__summary">
    <div className="audio__title skeleton"></div>
    <div className="audio__summary skeleton"></div>
  </div>
)