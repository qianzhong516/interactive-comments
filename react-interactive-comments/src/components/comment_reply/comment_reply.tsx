import React from 'react';
import { Avatar } from '../avatar/avatar';
import styles from './comment_reply.module.css';
import { Button } from '../button/button';
import { Textarea } from '../textarea/textarea';

type CommentReplyProps = {
  profileIcon: string;
  handleReply(): void;
  textareaRef: any;
};

export const CommentReply = ({
  profileIcon,
  handleReply,
  textareaRef,
}: CommentReplyProps) => (
  <div className={styles.container}>
    <Avatar src={profileIcon} />
    <Textarea
      className={styles.addComment}
      ref={textareaRef}
      placeholder="Add a comment..."
    />
    <Button variant="primary" onClick={handleReply}>
      Reply
    </Button>
  </div>
);
