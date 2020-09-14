import React from 'react';
import styles from './index.less';
interface RowType {
  title: string;
  [propName: string]: any;
}

export default function Row(props: RowType) {
  return <div className={styles.container}>{props.title}</div>;
}
