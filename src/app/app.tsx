// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import {
  ReactInteractiveComments,
  ReactInteractiveCommentType as CommentType,
} from 'react-interactive-comments';

export function App() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentUser, setCurrentUser] = useState<CommentType['user']>();

  useEffect(() => {
    fetch('./data.json')
      .then((data) => data.json())
      .then((data) => {
        setComments(data.comments);
        setCurrentUser(data.currentUser);
      });
  }, []);

  const onDeleteComment = (id: string | number) => {
    // implement database operations
  };

  const onUpdateComment = (
    id: string | number,
    payload: Partial<CommentType>
  ) => {
    // implement database operations
  };

  const onAddComment = (
    parentCommentId: string | number,
    replyToCommentId: string | number,
    payload: CommentType
  ) => {
    // implement database operations
  };

  const onUnathorisedOperation = () => {
    // provide a callback to handle logged-out users
    alert('Please login first.');
  };

  return (
    <ReactInteractiveComments
      comments={comments}
      onDeleteComment={onDeleteComment}
      onUpdateComment={onUpdateComment}
      currentUser={currentUser}
      onAddComment={onAddComment}
      onUnathorisedOperation={onUnathorisedOperation}
    />
  );
}

export default App;
