import React from 'react';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import classnames from 'classnames';
import styles from './comment_controls.module.css';

export const DeleteButton = ({ onClick }: { onClick(): void }) => (
  <Button
    variant="caution"
    icon={<Icon name="delete" size={20} />}
    onClick={onClick}
  >
    Delete
  </Button>
);

export const EditButton = ({ onClick }: { onClick(): void }) => (
  <Button
    variant="secondary"
    icon={<Icon name="edit" size={20} />}
    onClick={onClick}
  >
    Edit
  </Button>
);

export const ReplyButton = ({ onClick }: { onClick(): void }) => (
  <Button
    variant="secondary"
    icon={<Icon name="reply" size={20} />}
    onClick={onClick}
  >
    Reply
  </Button>
);

export const UpvoteButton = ({
  votes,
  onClick,
}: {
  votes: number;
  onClick(diff: number): void;
}) => {
  const [upvoted, setUpvoted] = React.useState(false);
  const handleOnClick = () => {
    onClick(upvoted ? -1 : 1);
    setUpvoted((state) => !state);
  };

  return (
    <Button
      className={classnames({ [styles.upvoted]: upvoted })}
      variant="secondary"
      icon={<Icon name="thumb_up_alt" size={20} />}
      onClick={handleOnClick}
    >
      ({votes})
    </Button>
  );
};
