import React from 'react';
import { SearchBar } from 'antd-mobile';
import { SearchBarPropsType } from 'antd-mobile/lib/search-bar/PropsType';
import styles from './index.less';

interface SearchPropsType extends SearchBarPropsType {
  className?: string;
  style?: React.CSSProperties;
}

const Search: React.FC<SearchPropsType> = props => {
  return (
    <div className={styles.container}>
      <SearchBar {...props} />
    </div>
  );
};

export default Search;
