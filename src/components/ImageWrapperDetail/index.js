import Styles from './ImageWrapperDetail.module.css';

import imgDum1 from '../../assets/images/imgdetail.png';
import imgDum2 from '../../assets/images/imgdetail2.png';

const ImageWrapperDetail = () => {
  return (
    <div className={Styles.wrapperContainer}>
      <span className={Styles.imageWrapper}>
        <span className={Styles.firstImageWrapper}>
          <img className={Styles.firstImage} src={imgDum1} alt="dim" />
        </span>
        <span className={Styles.secondImageWrapper}>
          <img src={imgDum2} alt="dim" />
        </span>
        <span className={Styles.thirdImageWrapper}>
          <img src={imgDum2} alt="dim" />
        </span>
        <span className={Styles.fourthImageWrapper}>
          <img src={imgDum2} alt="dim" />
        </span>
      </span>
    </div>
  );
};

export default ImageWrapperDetail;
