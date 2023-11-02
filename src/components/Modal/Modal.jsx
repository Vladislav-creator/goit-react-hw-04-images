
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.module';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const rootModal = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContent> {children}</ModalContent>
    </Overlay>,
    rootModal,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
};

