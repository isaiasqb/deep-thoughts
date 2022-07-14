import React from 'react';
//we're importing the useQuery Hook from Apollo Client. 
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';


// When we load the Home component in the application, 
//we'll execute the query for the thought data. Because this is asynchronous
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS); 
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  //because every GraphQL response comes in a big data object. 
  // In this case, we'll need to access data.thoughts
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive


  //If you're logged in, the loggedIn variable will be true; otherwise, it will be false.
  const loggedIn = Auth.loggedIn();

  return (
    <main>
        <div className="flex-row justify-space-between">
          {loggedIn && (
            <div className="col-12 mb-3">
              <ThoughtForm />
            </div>
          )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
              {loading ? (
              <div>Loading...</div>
            ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
        {loggedIn && userData ? (
          <div>
            <FriendList 
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
