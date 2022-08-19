const User = ({ user = "guest" }) => {
  return (
    <div className="header">
      <h3>Welcome, {user}</h3>
    </div>
  );
};

export default User;
