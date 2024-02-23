import React from "react";
import UserStore from "../../store/userStore";

const SubmitForm = (props) => {
  let { isFormSubmit } = UserStore();
  if (isFormSubmit === false) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className="flex items-center justify-center">
          <span className="border-gray-300 inline-block h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 mr-2"></span>
          Processing...
        </div>
      </button>
    );
  }
};

export default SubmitForm;
