import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  faHeart as fasHeart,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCardModal from "../ImageCardModal/ImageCardModal";

const ImageTile = ({
  id,
  url,
  title,
  shortDescription,
  longDescription,
  date,
  keywords,
  favorite,
  handleImageLike,
}) => {
  const [showCardModal, setShowCardModal] = useState(false);
  const description =
    (keywords && keywords.join(", ")) || shortDescription || longDescription;
  const stringDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onCardClose = () => {
    setShowCardModal(false);
  };

  return (
    <div className="tile">
      <img className="tile__img" src={url} alt={title} />
      <div className="tile__content">
        <FontAwesomeIcon
          className="favorite-icon"
          icon={favorite ? fasHeart : farHeart}
          onClick={() => handleImageLike(id)}
        />
        <FontAwesomeIcon
          className="expand-icon"
          icon={faExpand}
          onClick={() => setShowCardModal(true)}
        />
        <h2 className="tile__title">{title}</h2>
        <p className="tile__description">
          {description}
          <br />
          Date: {stringDate}
        </p>
        <button
          className="tile__like-btn"
          onClick={() => setShowCardModal(true)}
        >
          Read More
        </button>
      </div>
      <ImageCardModal
        imgTitle={title}
        imgDescription={longDescription}
        imgDate={stringDate}
        imgSrc={url}
        active={showCardModal}
        onClose={onCardClose}
      />
    </div>
  );
};

ImageTile.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  longDescription: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  keywords: PropTypes.arrayOf(PropTypes.string),
  favorite: PropTypes.bool,
  handleImageLike: PropTypes.func,
};

export default React.memo(ImageTile);
