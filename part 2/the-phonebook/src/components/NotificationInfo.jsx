const NotificationInfo = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="info">{message}</div>;
};

export default NotificationInfo;
