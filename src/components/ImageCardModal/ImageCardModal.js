import React from "react";
import PropTypes from "prop-types";

const ImageCardModal = ({
  imgSrc,
  imgTitle,
  imgDescription,
  imgDate,
  active,
  onClose,
}) => {
  const classNames = ["image-card-modal__popup"];
  if (active) classNames.push("image-card-modal__popup--active");

  return (
    <div className={classNames.join(" ")}>
      <div className="image-card-modal__popup-inner">
        <div className="image-card-modal__popup__photo">
          <img src={imgSrc} alt="" />
        </div>
        <div className="image-card-modal__popup__text">
          <h1>{imgTitle}</h1>
          <p>{imgDescription}</p>
          <p>{imgDate}</p>
        </div>
        <button className="image-card-modal__popup__close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

ImageCardModal.propTypes = {
  imgSrc: PropTypes.string,
  imgTitle: PropTypes.string,
  imgDescription: PropTypes.string,
  imgDate: PropTypes.string,
  active: PropTypes.bool,
  onClose: PropTypes.func,
};

export default React.memo(ImageCardModal);
