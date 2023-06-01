import "./FloatingLabelInput.css";

const FloatingLabelInput = ({ name, label, style = {}, ...props }) => {
  return (
    <div className="floating-input-container" style={style}>
      <input name={name} type="text" {...props} />
      <label htmlFor={name} className={props.value && "filled"}>
        <span className="filler" />
        {label}
        <span className="filler" />
      </label>
    </div>
  );
};
export default FloatingLabelInput;
