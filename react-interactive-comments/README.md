# React Interactive Comments

An interactive comment plugin powered by React. The plugin includes features such as editing comments, replying to a comment, giving a comment likes and deleting a comment. Nested comments are auto indented. Various callback props are provided for performing database operations.

## Git Repo

Feel free to make suggestions and raise issues.

https://github.com/qianzhong516/interactive-comments

## Demo

https://github.com/qianzhong516/interactive-comments/assets/33209457/d16cadf3-76d7-4a50-adb0-c8243a6a9e65



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
