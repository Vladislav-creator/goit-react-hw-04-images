import { useState, useEffect } from 'react';
import {Modal} from './Modal/Modal'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchDataApi} from 'services/PostApiService';

import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import{BackToTopButton} from 'components/ArrowTopButton/ArrowTopButton'
import { AppContent } from './App.module';

export const App = () => {
  
//   const [searchQuery, setSearchQuery] = useState(``)
//   const [galleryItems, setGalleryItems] = useState([])
//   const [galleryPage, setGalleryPage] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [isButtonShow, setIsButtonShow] = useState(false)
//   const [error, setError] = useState(true)



//   componentDidUpdate(_, prevState) {
//     const prevQuery = prevState.searchQuery;
//     const nextQuery = searchQuery;
//     const prevPage = prevState.galleryPage;
//     const nextPage = galleryPage;

//     if (prevQuery !== nextQuery) {
//       setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
//       if (nextPage === 1) {
//         fetchGalleryItems(nextQuery, nextPage);
//       }
//     } else if (prevPage !== nextPage) {
//       fetchGalleryItems(nextQuery, nextPage);
//     }
//   }

//   const fetchGalleryItems = (nextQuery, nextPage) => {
//     setLoading( true )
//      setError( false )

//     postApiService.query = nextQuery;
//     postApiService.page = nextPage;

//     postApiService.fetchPost().then(data => {
//       postApiService.hits = data.totalHits;

//       const newData = data.hits.map(
//         ({ id, tags, webformatURL, largeImageURL }) => ({
//           id,
//           tags,
//           webformatURL,
//           largeImageURL,
//         })
//       );
//       const currentData = [...galleryItems, ...newData];

//       setGalleryItems(prevState => 
//         galleryItems = [...prevState.galleryItems, ...newData],
//       );
      
//       if (!data.totalHits) {
//        setLoading(false) 
//        setError(true)
//         return toast.warn(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }

//       if (currentData.length >= data.totalHits) {
//           setLoading(false)
//           setIsButtonShow(false)
//           setError(false)
//         return;
//       }

//       if (nextPage === 1) {
//         toast.success(`Hooray! We found ${postApiService.hits} images.`);
//       }

//       this.setState({
//         loading: false,
//         isButtonShow: true,
//         error: false,
//       });
//     });
//   };

//   const handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//  const onLoadMore = (e) => {
//     this.setState(prevState => ({
//       galleryPage: prevState.galleryPage + 1,
//     }));
//     e.target.blur();
//   };

//     return (
//       <AppContent>
//         <Searchbar onSubmit={handleFormSubmit} />

//         {error && <h2>Please, enter search word!</h2>}
//         {!error && <ImageGallery galleryItems={galleryItems} />}
//         {loading && <Loader />}
//         {isButtonShow && <Button onClick={onLoadMore} />}

       
//         <ToastContainer autoClose={3000} theme="dark" />
//        < BackToTopButton/>
//       </AppContent>
//     );
  
// }

const [gallery, setGallery] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [page, setPage] = useState(1);
const [showModal, setShowModal] = useState(false);
const [showLoader, setShowLoader] = useState(false);
const [error, setError] = useState(null);
const [largeImage, setLargeImage] = useState({});
const [total, setTotal] = useState(0);

useEffect(() => {
  if (searchQuery) {
  fetchGallery(searchQuery);
  }
}, [searchQuery]);



const fetchGallery = () => {
  setShowLoader(true);

  fetchDataApi(searchQuery, page)
    .then(({ hits, total }) => {
      setGallery(prev => [...prev, ...hits]);
      setPage(prev => prev + 1);
      setTotal(total);
    })
    .catch(error => setError(error))
    .finally(() => setShowLoader(false));
};

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

    {error && <p>{error.message}</p>}

    {gallery.length > 0 && (
      <ImageGallery gallery={gallery} onOpenPicture={handleOpenPicture} />
    )}

    {showLoader && <Loader/>}

    {gallery.length > 0 && !showLoader && showLoadMore() && (
      <Button onClick={fetchGallery} />
    )}

    {showModal && (
      <Modal onClose={toggleModal}>
        <img src={largeImage.largeImageURL} alt={largeImage.tags} />
      </Modal>
    )}
     < BackToTopButton/>
   </AppContent>
);
}

