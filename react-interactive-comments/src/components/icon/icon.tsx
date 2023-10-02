import classnames from 'classnames';
import styles from './icon.module.css';

type IconProps = {
  name: string;
  size: number;
  className?: string;
};

export const Icon = ({ name, size, className }: IconProps) => {
  return (
    <span
      className={classnames('material-icons', styles.icon, className)}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
};
