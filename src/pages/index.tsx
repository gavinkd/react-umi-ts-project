import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

interface HomePageType {
  title: string;
}

const HomePage: React.FC<HomePageType> = props => {
  const { title } = props;
  const [index] = useState<number>(1);
  return (
    <div className={styles.title}>
      {title}-{index}
    </div>
  );
};

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
};

HomePage.defaultProps = {
  title: '哈哈',
};

export default HomePage;
