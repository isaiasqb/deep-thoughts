// Adding a thought will be a little more involved than adding a friend, because we're dealing with text input and not just a single button. 
// The ability to add thoughts will also be available on multiple pages
// —the homepage and the Profile page— so we'll want to set up this capability as its own component.

import React, { useState } from 'react';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    setText('');
    setCharacterCount(0);
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch"
      onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Here's a new thought..."
          className="form-input col-12 col-md-9"
          value={thoughtText}
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;