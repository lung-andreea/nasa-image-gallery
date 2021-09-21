import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import ImageTile from "../ImageTile/ImageTile";
import Grid from "../Grid/Grid";

const GRID_BREAKPOINTS = [350, 500, 750];

const Gallery = () => {
  const [imageList, setImageList] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [gridLoading, setGridLoading] = useState(true);

  const handleImageLike = (imageId) => {
    const imageIndex = likedImages.indexOf(imageId);
    setLikedImages(
      imageIndex === -1
        ? [...likedImages, imageId]
        : likedImages.filter((item) => item !== imageId)
    );
  };

  const getFormattedImageData = (apiImageData) => {
    return apiImageData.collection.items
      .filter(
        (item) =>
          item.data[0]["media_type"] === "image" &&
          item.data[0]["nasa_id"] !== "PIA21519"
      )
      .map((item) => ({
        id: item.data[0]["nasa_id"],
        url: item.links[0].href,
        title: item.data[0].title,
        shortDescription: item.data[0]["description_508"],
        longDescription: item.data[0].description,
        date: new Date(item.data[0]["date_created"]),
        keywords: item.data[0].keywords,
      }));
  };

  const handleApiResponse = (response) => {
    setTimeout(() => {
      setImageList(getFormattedImageData(response));
      setGridLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setGridLoading(true);
    api
      .getMostPopular()
      .then((response) => handleApiResponse(response))
      .fail((error) => {
        console.log("Error retrieving image list", error);
      });
  }, []);

  return (
    <div className="gallery">
      <h1>
        <label className="label">Liked pictures: </label>
        <label className="liked-images-count">{likedImages.length}</label>
      </h1>
      <Grid brakePoints={GRID_BREAKPOINTS} loading={gridLoading}>
        {imageList.map((image) => (
          <ImageTile
            id={image.id}
            key={image.id}
            url={image.url}
            shortDescription={image.shortDescription}
            longDescription={image.longDescription}
            title={image.title}
            date={image.date}
            keywords={image.keywords}
            favorite={likedImages.indexOf(image.id) !== -1}
            handleImageLike={handleImageLike}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Gallery;
