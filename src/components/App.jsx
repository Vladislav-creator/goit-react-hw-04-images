import { useState, useEffect } from 'react';
import {Modal} from './Modal/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchDataApi} from 'services/PostApiService';

import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import{BackToTopButton} from 'components/ArrowTopButton/ArrowTopButton'
import { AppContent, Title } from './App.module';

export const App = () => {


const [gallery, setGallery] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [page, setPage] = useState(1);
const [showModal, setShowModal] = useState(false);
const [showLoader, setShowLoader] = useState(false);
const [error, setError] = useState(null);
const [largeImage, setLargeImage] = useState({});
const [total, setTotal] = useState(0);

useEffect(() => {
  const fetchGallery  = async () => {
    try {
      setShowLoader(true);

      const { hits, totalHits } = await fetchDataApi(searchQuery, page);

      if (!totalHits) {
        toast.warn('Sorry, there are no images matching your search query. Please try again.!');
        return;
      }

      if (page === 1) {
        toast.success(`Found: ${totalHits} images for your request`);
      }

      setGallery(prevHits => [...prevHits, ...hits]);
      setTotal(totalHits);
      setShowLoader(false);
    } catch (error) {
      setError(error);
      
    } finally {
      setShowLoader(false);
    }
  };

  if (!searchQuery) {
    return;
  }

  fetchGallery ();
}, [searchQuery, page]);

const handleLoadMore = () => {
  setPage(prev => prev + 1)
}

const handleFormSubmit = query => {
  if (query === searchQuery) {
    return;
  }

  setSearchQuery(query);
  setGallery([]);
  setPage(1);
};

const toggleModal = () => {
  setShowModal(prev => !prev);
};

const handleOpenPicture = largeImage => {
  setLargeImage(largeImage);
  toggleModal();
};

const showLoadMore = () => {
  return Math.ceil(total / 12) !== page - 1;
};

return (
  <AppContent>
    <Searchbar onSubmit={handleFormSubmit} />

  
    {!searchQuery && <Title>Please, enter search word!</Title>}
    {gallery.length > 0 && (
      <ImageGallery gallery={gallery} onOpenPicture={handleOpenPicture} />
    )}

    {showLoader && <Loader/>}

    {gallery.length > 0 && !showLoader && showLoadMore() && (
      <Button onClick={handleLoadMore} />
    )}

    {showModal && (
      <Modal onClose={toggleModal}>
        <img src={largeImage.largeImageURL} alt={largeImage.tags} />
      </Modal>
    )}
    {error && <p>{error.message}</p>}
    <ToastContainer autoClose={3000} theme="dark" />
     < BackToTopButton/>
    
   </AppContent>
);
}