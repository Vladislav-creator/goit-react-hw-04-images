import { ButtonLoad } from './Button.module';
import PropTypes from 'prop-types';
export const Button = ({ onClick }) => {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load More
    </ButtonLoad>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};