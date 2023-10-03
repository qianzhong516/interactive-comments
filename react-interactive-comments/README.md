# React Interactive Comments

An interactive comment plugin powered by React.

## Demo

## Usage

```ts
import {
  ReactInteractiveComments,
  ReactInteractiveCommentType as CommentType,
} from 'react-interactive-comments';

export function App() {
  const comments: CommentType[] = [...];

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
```
