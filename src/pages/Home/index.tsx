import React from 'react';
import { Flex } from 'antd-mobile';
import Card from '@/components/Card';
import Search from '@/components/Search';
import { PAGE_DICTIONARY } from '@/dictionary';
import styles from './index.less';

const HomePage: React.FC = props => {
  return (
    <React.Fragment>
      <Search placeholder="搜素组件" className={styles.search} />
      <Flex direction="column">
        {PAGE_DICTIONARY.map((item, index) => {
          return (
            <Flex.Item key={index} className={styles.item}>
              <Card
                title={item.title}
                description={item.description}
                pathName={item.pathname}
              />
            </Flex.Item>
          );
        })}
      </Flex>
    </React.Fragment>
  );
};

export default HomePage;
