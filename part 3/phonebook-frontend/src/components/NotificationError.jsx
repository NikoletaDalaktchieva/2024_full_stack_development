import PropTypes from 'prop-types';

const NotificationError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};


NotificationError.propTypes = {
  message: PropTypes.array.isRequired, 
};

export default NotificationError;
