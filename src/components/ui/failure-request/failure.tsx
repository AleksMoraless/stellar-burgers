import { FC, memo } from 'react';
import styles from './failure.module.css';

type TFailure = {
  message: string;
}

export const Failure: FC<TFailure> = memo(({ message }) => {
  return <p className={styles.failure}>{message}</p>
});
