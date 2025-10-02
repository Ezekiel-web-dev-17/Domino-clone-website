import React from "react";

const Feedback = () => {
  return (
    <form id="feedback" action="post">
      {/* Required in the backend for feeback from emails */}
      <legend>
        <label>Your Name: </label>
        <input type="text" name="name" required />
      </legend>
      <legend>
        <label>Your Email: </label>
        <input type="email" name="email" required />
      </legend>
      <legend>
        <label>Your Message: </label>
        <textarea name="message" required></textarea>
      </legend>
    </form>
  );
};

export default Feedback;
