import Styles from './ImageWrapperDetail.module.css';

const ImageWrapperDetail = ({ image }) => {
  return (
    <div className={Styles.wrapperContainer}>
      <span className={Styles.imageWrapper}>
        <span className={Styles.firstImageWrapper}>
          <img
            style={{ width: '100%', objectFit: 'cover' }}
            src={image.image}
            alt="one"
          />
        </span>
        <span className={`d-flex justify-content-center align-items-center`}>
          <img
            className={Styles.fitImage}
            src={!image.imageFirst ? image.image : image.imageFirst}
            alt="two"
          />
        </span>
        <span className={Styles.thirdImageWrapper}>
          <img
            className={Styles.fitImage}
            src={!image.imageSecond ? image.image : image.imageSecond}
            alt="three"
          />
        </span>
        <span className={Styles.fourthImageWrapper}>
          <img
            className={Styles.fitImage}
            src={!image.imageThird ? image.image : image.imageThird}
            alt="four"
          />
        </span>
      </span>
    </div>
  );
};

export default ImageWrapperDetail;
