
import { GalleryItem, GalleryImg } from './ImageGalleryItem.module';

import PropTypes from 'prop-types';
export function ImageGalleryItem({ picture, onOpenPicture }) {
  return (
    <GalleryItem
      onClick={() => {
        onOpenPicture(picture);
      }}
    >
      <GalleryImg src={picture.webformatURL} alt={picture.tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};