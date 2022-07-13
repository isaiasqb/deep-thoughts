import React from 'react';
//import a React Hook for singling out params
import { useParams } from 'react-router-dom';
//import query for a single thought
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = props => {
  const {id: thoughtId } = useParams();
  console.log(thoughtId);

  //The variables loading and data are destructured from the useQuery Hook. 
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
