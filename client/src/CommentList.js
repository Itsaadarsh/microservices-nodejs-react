import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    return comment.status === 'approved' ? (
      <li key={comment.id}>{comment.content}</li>
    ) : comment.status === 'pending' ? (
      <li>Pending</li>
    ) : (
      <li>This is rejected</li>
    );
  });

  return <ul>{renderedComments}</ul>;
};
