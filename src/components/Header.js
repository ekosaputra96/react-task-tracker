import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ onAddToggle, name, showAdd }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{name}</h1>
      {location.pathname === "/todos" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          teken={onAddToggle}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  name: "Task Tracker",
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
