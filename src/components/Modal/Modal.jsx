import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.module';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root')
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
      document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
     document.body.style.overflow = 'auto';
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return createPortal(
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalContent className="modal">
          <img src={largeImageURL} alt={alt} />
        </ModalContent>
      </Overlay>, modalRoot
    );
  }
}
Modal.propTypes = {
  image: PropTypes.object,
  onCloseModal: PropTypes.func,
};