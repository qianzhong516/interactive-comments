import React from 'react';
import styles from './comment.module.css';
import { Button } from '../button/button';
import { Avatar } from '../avatar/avatar';
import { CommentReply } from '../comment_reply/comment_reply';
import {
  DeleteButton,
  EditButton,
  ReplyButton,
  UpvoteButton,
} from './comment_controls';
import { Textarea } from '../textarea/textarea';
import { CommentType } from '../../types';
import { Icon } from '../icon/icon';

type CommentProps = {
  id: string | number;
  votes: number;
  profileIcon: string;
  username: string;
  currentUser?: CommentType['user'];
  timeAgo: string;
  content: string;
  replyingTo: string;
  depth: number;
  maxDepth: number;
  onDeleteComment(id: string | number): void;
  onUpdateComment(id: string | number, payload: Partial<CommentType>): void;
  onAddComment(
    replyToCommentId: string | number,
    content: string,
    replyingTo: string
  ): void;
  onUnathorisedOperation(): void;
};

export const Comment = ({
  id,
  votes,
  depth,
  maxDepth,
  currentUser,
  onDeleteComment,
  onUpdateComment,
  onAddComment,
  onUnathorisedOperation,
  ...commentContentProps
}: CommentProps) => {
  const [onEdit, setOnEdit] = React.useState(false);
  const [onReply, setOnReply] = React.useState(false);
  const editingTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const replyingTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const isCurrentUser = currentUser?.username === commentContentProps.username;

  const onReplyClicked = () => {
    if (currentUser?.username == null) {
      onUnathorisedOperation();
      return;
    }
    setOnReply((state) => !state);
  };
  const onDelete = (id: string | number) => onDeleteComment(id);
  const onEditClicked = () => setOnEdit((state) => !state);
  const onUpdate = () => {
    if (editingTextareaRef.current) {
      onUpdateComment(id, { content: editingTextareaRef.current.value });
    }
    setOnEdit(false);
  };
  const onUpvote = (diff: number) => {
    onUpdateComment(id, { score: votes + diff });
  };

  const commentContentControls = (
    <div className={styles.controls}>
      {isCurrentUser ? (
        <>
          <DeleteButton onClick={() => onDelete(id)} />
          <EditButton onClick={onEditClicked} />
        </>
      ) : (
        <>
          <UpvoteButton votes={votes} onClick={onUpvote} />
          <ReplyButton onClick={onReplyClicked} />
        </>
      )}
    </div>
  );

  const commentContentBody = onEdit ? (
    <>
      <Textarea
        ref={editingTextareaRef}
        defaultValue={commentContentProps.content}
      />
      <Button variant="primary" onClick={onUpdate}>
        Update
      </Button>
    </>
  ) : (
    commentContentProps.content
  );

  const handleReply = () => {
    if (replyingTextareaRef.current) {
      onAddComment(
        id,
        replyingTextareaRef.current.value,
        commentContentProps.username
      );
      setOnReply(false);
    }
  };

  const commentOnReply = currentUser && (
    <div className={styles.commentWrapper}>
      <Indentation space={Math.min(depth + 1, maxDepth)} />
      <CommentReply
        textareaRef={replyingTextareaRef}
        profileIcon={currentUser.image}
        handleReply={handleReply}
      />
    </div>
  );

  return (
    <>
      <div className={styles.commentWrapper}>
        <Indentation space={Math.min(depth, maxDepth)} />
        <CommentContent
          controls={commentContentControls}
          body={commentContentBody}
          isCurrentUser={isCurrentUser}
          {...commentContentProps}
        />
      </div>
      {onReply && commentOnReply}
    </>
  );
};

const Indentation = ({ space }: { space: number }) => (
  <div style={{ width: space * 30 }}></div>
);

const CommentContent = ({
  profileIcon,
  username,
  replyingTo,
  isCurrentUser,
  timeAgo,
  controls,
  body,
}: {
  profileIcon: string;
  username: string;
  replyingTo: string;
  isCurrentUser: boolean;
  timeAgo: string;
  controls: React.ReactNode;
  body: React.ReactNode;
}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Avatar src={profileIcon} />
          <div className={styles.username}>{username}</div>
          {isCurrentUser && <div className={styles.currentUserTag}>you</div>}
          {replyingTo && (
            <div className={styles.replyingTo}>
              <Icon name="reply" size={15} />
              {replyingTo}
            </div>
          )}
          <div className={styles.timeAgo}>{timeAgo}</div>
        </div>
        {controls}
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
