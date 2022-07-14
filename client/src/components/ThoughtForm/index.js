// Adding a thought will be a little more involved than adding a friend, because we're dealing with text input and not just a single button. 
// The ability to add thoughts will also be available on multiple pages
// —the homepage and the Profile page— so we'll want to set up this capability as its own component.

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  //the addThought() function will run the actual mutation. 
  // The error variable will initially be undefined but can change depending on if the mutation failed.
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    //new thought should go inside an array of thoughts, but the array itself has no ID to track. 
    //So to get the updated array, re-request it from the server.
    // Manually insert the new thought object into the cached array. 
    // The useMutation Hook can include an update function that allows us to update the cache of any related queries. 
    // The query we'll need to update is QUERY_THOUGHTS; import this query into ThoughtForm/index.js
    update(cache, {data: { addThought } }) {
      //reads what's currently in the cache
      //In the update() function, addThought represents the new thought that was just created. 
      //Using the cache object, we can read what's currently saved in the QUERY_THOUGHTS cache and then update it with writeQuery() 
      //to include the new thought object.
      try { //could potentially not exist yet, so wrap it in a try...catch
        //update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn('First thought insertion by user')
      }

      //update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

    // prepend the newest thought to the front of the array
    cache.writeQuery({
      query: QUERY_THOUGHTS,
      data: { thoughts: [addThought, ...thoughts] }
      });
    }
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      //add thought to database
      await addThought ({
        variables: { thoughtText }
      });
      // clear form
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className='ml-2'>Something went wrong...</span>}
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