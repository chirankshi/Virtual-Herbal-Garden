import React from "react";
import Masonry from "react-masonry-css";
import "./Massonary.css";



const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Massonry = ({ images = [] }) => (
  <div className="ourTeam__MasonaryContainer">
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((src, i) => (
        <div key={i} className="masonry-item">
          <img src={src} alt={`img-${i}`} />
        </div>
      ))}
    </Masonry>
  </div>
);

export default Massonry;
