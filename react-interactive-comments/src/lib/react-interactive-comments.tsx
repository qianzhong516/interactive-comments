import { CommentType } from '../types';
import { useState, useEffect, useCallback } from 'react';
import { Comment } from '../components/comment/comment';
import { formatDistanceToNow } from 'date-fns';

export type ReactInteractiveCommentType = CommentType;

export interface ReactInteractiveCommentsProps {
  comments: CommentType[];
  maxDepth?: number;
  currentUser?: CommentType['user'];
  onDeleteComment(id: string | number): void;
  onUpdateComment(id: string | number, payload: Partial<CommentType>): void;
  onAddComment(
    parentCommentId: string | number,
    replyToCommentId: string | number,
    payload: CommentType
  ): void;
  onUnathorisedOperation(): void;
}

export function ReactInteractiveComments({
  comments,
  maxDepth = 3,
  currentUser,
  onDeleteComment,
  onUpdateComment,
  onAddComment,
  onUnathorisedOperation,
}: ReactInteractiveCommentsProps) {
  const mapRepliesToParentComments = useCallback(() => {
    const table: {
      [key: string | number]: (CommentType & { depth: number })[];
    } = {};
    for (const comment of comments) {
      // TODO: extract `getCommentReplies` to props
      table[comment.id] = getCommentReplies(comment.replies);
    }
    return table;
  }, [comments]);
  // TODO: normalize comments data to reduce search computation throughout a large list
  const [commentsData, setCommentsData] = useState(comments);
  const [replies, setReplies] = useState<{
    [key: string | number]: (CommentType & { depth: number })[];
  }>(mapRepliesToParentComments);

  useEffect(() => {
    setCommentsData(comments);
    setReplies(mapRepliesToParentComments());
  }, [comments, mapRepliesToParentComments]);

  const handleDeleteComment = (id: string | number) => {
    // if the comment contains descendant comments, delete the content instead
    if (replies[id].length > 0) {
      const index = commentsData.findIndex((comment) => comment.id === id);
      const comments = commentsData.slice();
      commentsData[index].content = '[Deleted Content]';
      setCommentsData(comments);
      onUpdateComment(id, {
        ...commentsData[index],
        content: '[Deleted Content]',
      });
      return;
    }

    setCommentsData(commentsData.filter((comment) => comment.id !== id));
    onDeleteComment(id);
  };

  const handleDeleteReply =
    (commentId: string | number) => (replyId: string | number) => {
      const updatedReplies = replies[commentId].filter(
        (reply) => reply.id !== replyId
      );
      setReplies({
        ...replies,
        [commentId]: updatedReplies,
      });
      onDeleteComment(replyId);
    };

  const handleUpdateComment = (
    id: string | number,
    payload: Partial<CommentType>
  ) => {
    const index = commentsData.findIndex((comment) => comment.id === id);
    if (index < 0) {
      return;
    }
    const comments = commentsData.slice();
    comments[index] = {
      ...comments[index],
      ...payload,
    };
    setCommentsData(comments);
    onUpdateComment(id, payload);
  };

  const handleUpdateReply =
    (commentId: string | number) =>
    (id: string | number, payload: Partial<CommentType>) => {
      const index = replies[commentId].findIndex((reply) => reply.id === id);
      if (index < 0) {
        return;
      }
      const updatedReplies = replies[commentId].slice();
      updatedReplies[index] = {
        ...updatedReplies[index],
        ...payload,
      };
      setReplies({
        ...replies,
        [commentId]: updatedReplies,
      });
      onUpdateComment(id, payload);
    };

  const handleAddComment = (
    parentId: string | number,
    replyToCommentId: string | number,
    content: string,
    depth: number,
    replyingTo: string,
    user?: CommentType['user']
  ) => {
    if (!user) {
      return;
    }

    const appendToCommentIndex = replies[parentId].findIndex(
      (reply) => reply.id === replyToCommentId
    );
    const updatedReplies = replies[parentId].slice();
    const payload = {
      id: (Math.random() * 1000).toString(),
      content,
      replyingTo,
      createdAt: Date.now(),
      score: 0,
      user,
      replies: [],
    };
    updatedReplies.splice(appendToCommentIndex + 1, 0, {
      ...payload,
      depth,
    });
    setReplies({
      ...replies,
      [parentId]: updatedReplies,
    });
    onAddComment(parentId, replyToCommentId, payload);
  };

  return commentsData.map((comment) => (
    <div key={comment.id}>
      <Comment
        {...getCommentProps(comment)}
        currentUser={currentUser}
        depth={0}
        maxDepth={maxDepth}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
        onAddComment={(replyToCommentId, content, replyingTo) =>
          handleAddComment(
            comment.id,
            replyToCommentId,
            content,
            1,
            replyingTo,
            currentUser
          )
        }
        onUnathorisedOperation={onUnathorisedOperation}
      />
      {replies[comment.id]?.map((reply) => (
        <Comment
          key={reply.id}
          {...getCommentProps(reply)}
          currentUser={currentUser}
          depth={reply.depth}
          maxDepth={maxDepth}
          onDeleteComment={handleDeleteReply(comment.id)}
          onUpdateComment={handleUpdateReply(comment.id)}
          onAddComment={(replyToCommentId, content, replyingTo) =>
            handleAddComment(
              comment.id,
              replyToCommentId,
              content,
              reply.depth + 1,
              replyingTo,
              currentUser
            )
          }
          onUnathorisedOperation={onUnathorisedOperation}
        />
      ))}
    </div>
  ));
}

function getCommentProps(comment: CommentType) {
  return {
    id: comment.id,
    votes: comment.score,
    profileIcon: comment.user.image.png,
    username: comment.user.username,
    timeAgo: getTimeAgo(+comment.createdAt),
    content: comment.content,
    replyingTo: comment.replyingTo,
  };
}

function getCommentReplies(
  replies: CommentType[],
  depth = 1
): (CommentType & { depth: number })[] {
  if (!replies?.length) {
    return [];
  }

  const comments = [];
  for (const comment of replies) {
    comments.push({
      ...comment,
      depth,
    });
    comments.push(...getCommentReplies(comment.replies, depth + 1));
  }

  return comments;
}

function getTimeAgo(timestamp: number) {
  const time = formatDistanceToNow(timestamp);
  return `${time} ago`;
}

export default ReactInteractiveComments;
