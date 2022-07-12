import React from 'react';
//we're importing the useQuery Hook from Apollo Client. 
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

import ThoughtList from '../components/ThoughtList';


// When we load the Home component in the application, 
//we'll execute the query for the thought data. Because this is asynchronous
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS); 

  //because every GraphQL response comes in a big data object. 
  // In this case, we'll need to access data.thoughts
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
              {loading ? (
              <div>Loading...</div>
            ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
