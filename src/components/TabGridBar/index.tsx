import React from 'react';
import { TabBar } from 'antd-mobile';
import PropsTypes from 'prop-types';
import { TabGridBarItem, TabGridBarType } from './PropsType';

const Item = TabBar.Item;

const TabGridBar: React.FC<TabGridBarType> = props => {
  // eslint-disable-next-line react/prop-types
  const { barTintColor, tintColor, data, hidden, unselectedTintColor } = props;

  return (
    <TabBar
      barTintColor={barTintColor}
      tintColor={tintColor}
      unselectedTintColor={unselectedTintColor}
      hidden={hidden}
    >
      {// eslint-disable-next-line react/prop-types
      data.map(i => (
        <Item
          title={i.title}
          key={i.key}
          selected={i.selected}
          selectedIcon={i.selectedIcon}
        />
      ))}
    </TabBar>
  );
};

TabGridBar.propTypes = {
  tintColor: PropsTypes.string,
  barTintColor: PropsTypes.string,
  hidden: PropsTypes.bool,
  unselectedTintColor: PropsTypes.string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data: PropsTypes.array,
};

export default TabGridBar;
