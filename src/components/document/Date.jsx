const DateComponent = ({ name, value, email }) => {
  const formattedDate = value && value.seconds
    ? new Date(value.seconds * 1000).toLocaleDateString().replaceAll("/", ".") : "Invalid Date";

  return (
    <div className="field">
      <span className="field__name">{name}: </span>
      <span className="field__value">{formattedDate}</span>
      <button className="button field__button"><i className="bi bi-pencil-square"></i></button>
    </div>
  );
};

export default DateComponent;