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
    <div>
      <h1 className={styles.title}>
        {title}-{index}
      </h1>
    </div>
  );
};

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomePage;
