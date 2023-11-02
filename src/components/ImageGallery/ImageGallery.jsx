import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.module';
import PropTypes from 'prop-types';
export function ImageGallery({ gallery, onOpenPicture }) {
  return (
    <Gallery>
      {gallery.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          picture={picture}
          onOpenPicture={onOpenPicture}
        />
      ))}
    </Gallery>
  );
}
ImageGallery.propTypes = {
  items: PropTypes.array,
};