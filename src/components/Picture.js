function Picture({ photo }) {
  return (
    <div className="picture">
      <p>{photo.photographer}</p>
      <div className="imageContainer">
        <img src={photo.src.large} alt={photo} />
      </div>
      <p>
        download image:
        <a target="_blank" href={photo.src.large}>
          here
        </a>
      </p>
    </div>
  );
}

export default Picture;
