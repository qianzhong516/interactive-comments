# React Interactive Comments

An interactive comment plugin powered by React. The plugin includes features such as editing comments, replying to a comment, giving a comment likes and deleting a comment. Nested comments are auto indented. Various callback props are provided for performing database operations.

## Demo
https://github.com/qianzhong516/interactive-comments/assets/33209457/0197cd8a-6a63-4aaf-8efe-be0441aeb8b3



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
