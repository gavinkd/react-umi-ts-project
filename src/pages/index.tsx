import React,{ useState }from 'react';
import styles from './index.less';

interface HomePageType {
  title?: string;
}

const HomePage:React.FC<HomePageType> = (props) => {
  const { title = '哈哈' } = props
  const [ index ] = useState<number>(1)
  return (
    <div>
      <h1 className={styles.title}>{title}-{index}</h1>
    </div>
  );
}

export default HomePage
