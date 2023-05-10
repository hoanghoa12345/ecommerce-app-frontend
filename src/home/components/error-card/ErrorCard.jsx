import React from "react";
import PropTypes from "prop-types";

const ErrorCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl">{props.title}</h2>
      <img
        className="h-64"
        src="https://cdn.dribbble.com/users/2394319/screenshots/4773584/media/598d91dbd5b67d8bbb9e38d2d8e0967c.png?compress=1&resize=800x600&vertical=top"
        alt=""
      />
      <p className="text-base">{props.message}</p>
      <code className="text-red-500 text-sm">{props.errors?.message}</code>
    </div>
  );
};

ErrorCard.propTypes = {
  title: PropTypes.string,
  errors: PropTypes.object,
  message: PropTypes.string,
};

export default ErrorCard;
