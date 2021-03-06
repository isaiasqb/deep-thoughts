import React from 'react';

//Navigate cmponent allows to redirect the user to anothe rroute within the application similar to location.replace()
//but uses react's ability not to refresh te page
import { Navigate, useParams } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';
import ThoughtForm from '../components/ThoughtForm';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';

const Profile = () => {
  // destructure the mutation function from ADD_FRIEND so we can use it in a click function.
  const [addFriend] = useMutation(ADD_FRIEND)

  const { username: userParam } = useParams();

  //username is optional. This means that on component load, 
  // the useParams() Hook we use will have a value if it's another user's profile and won't have a value if it's ours. 
  //Now if there's a value in userParam run the QUERY_USER query. 
  // If there's no value , simply /profile QUERY_ME
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

// when QUERY_ME runs, the response will return with our data in the 'me' property; 
// when QUERY_USER runs instead, the response will return with our data in the 'user' property
const user = data?.me || data?.user || {};

// navigate to personal profile page if username is the logged-in user's
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Navigate to="/profile" />;
}

if (loading) {
  return <div>Loading...</div>;
}

//  if there is no user data to display, we know that we aren't logged in or at another user's profile page
if (!user?.username) {
  return (
    <h4>
      You need to be logged in to see this page. Use the navigation links above to sign up or log in!
    </h4>
  );
}

// function to handle the addFriend() mutation 
const handleClick = async () => {
  try {
    await addFriend({
      variables: { id: user._id }
    });
  } catch (e) {
    console.error(e);
  }
};

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {/* the userParam variable is only defined when the route includes a username */}
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={user.username}
              friendCount={user.friendCount}
              friends={user.friends}
            />
        </div>
      </div>
      {/* userParam variable to make sure the form only displays on the user's own Profile page, not on other users' pages */}
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
