import styles from './avatar.module.css';

export const Avatar = ({ src, size = 30 }: { src: string; size?: number }) => {
  return (
    <div className={styles.avatar}>
      <img src={src} width={size} height={size} alt="" />
    </div>
  );
};
