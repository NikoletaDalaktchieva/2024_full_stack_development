import PropTypes from 'prop-types';

const NotificationInfo = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="info">{message}</div>;
};

NotificationInfo.propTypes = {
  message: PropTypes.array.isRequired, 
};

export default NotificationInfo;
