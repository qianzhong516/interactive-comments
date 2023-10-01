import React from 'react';
import styles from './textarea.module.css';
import classnames from 'classnames';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  {
    defaultValue?: string;
    className?: string;
    placeholder?: string;
  }
>((props, ref) => {
  return (
    <textarea
      {...props}
      className={classnames(props.className, styles.textarea)}
      ref={ref}
    ></textarea>
  );
});
