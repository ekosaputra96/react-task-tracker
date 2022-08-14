import PropTypes from "prop-types";

const Button = ({ text, color, teken }) => {
  return (
    <button style={{ backgroundColor: color }} className="btn" onClick={teken}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Add",
  color: "green",
  teken: () => {
    alert("declare your function using teken argument");
  },
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  teken: PropTypes.func,
};
export default Button;
