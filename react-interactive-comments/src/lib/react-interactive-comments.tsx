import styles from './react-interactive-comments.module.css';

/* eslint-disable-next-line */
export interface ReactInteractiveCommentsProps {}

export function ReactInteractiveComments(props: ReactInteractiveCommentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactInteractiveComments!</h1>
    </div>
  );
}

export default ReactInteractiveComments;
