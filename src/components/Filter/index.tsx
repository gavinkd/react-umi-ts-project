/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Flex } from 'antd-mobile';
import classnames from 'classnames';
import AwoweIcon from './icon/awowe.svg';
import { fixedBody, looseBody } from '@/utils/utils';
import { FilterOption, FilterProps, FilterOptionItem } from './Propstype';
import styles from './index.less';

const Filter: React.FC<FilterProps> = props => {
  const {
    filter,
    defaultActionKey = null,
    closePanel,
    onSelect,
    independent = false,
  } = props;
  const [currentAction, setCurrentAction] = useState<string | null>(
    defaultActionKey,
  );
  const [renderOptionsData, setRenderOptionsData] = useState<
    FilterOptionItem[]
  >([]);
  const [
    currentItemAction,
    setCurrentItemAction,
  ] = useState<FilterOptionItem | null>(null);
  const [maskShow, setMastShow] = useState(false); // 蒙层

  const onChangeTab = (key: string, tab: FilterOption) => {
    setCurrentAction(key);
    setMastShow(true);
    setRenderOptionsData(tab.options ? tab.options : []);
    fixedBody();
  };

  const renderTabs = () => {
    if (filter.length === 0) {
      return null;
    }
    const tempTabs: any[] = [];
    filter.forEach(tab => {
      const cls = classnames({
        [styles.item]: true,
        [styles.current]: tab.key === currentAction && !closePanel,
      });
      const iconCls = classnames({
        [styles.currentIcon]: tab.key === currentAction && !closePanel,
      });

      let text = '';
      if (tab.key === currentAction && currentItemAction) {
        if (
          tab.options.find(cItem => cItem.label === currentItemAction.label)
        ) {
          text = currentItemAction.label;
        } else {
          text = tab.text;
        }
      } else {
        text = tab.text;
      }
      tempTabs.push(
        <Flex.Item
          className={cls}
          key={tab.key}
          onClick={() => onChangeTab(tab.key, tab)}
        >
          {text}
          <img src={AwoweIcon} className={iconCls} alt="" />
        </Flex.Item>,
      );
    });
    // eslint-disable-next-line consistent-return
    return tempTabs;
  };

  const optionHandle = (item: FilterOptionItem, key: string) => {
    setCurrentItemAction(item);
    setRenderOptionsData([]);
    setMastShow(false);
    looseBody();
    if (onSelect) {
      const i = filter.find(i => i.key === key);
      if (i) {
        const params: Record<string, string> = { [i.field]: item.value };
        onSelect(params, key);
      } else {
        onSelect(item, key);
      }
    }
  };

  const renderOptions = (options: FilterOptionItem[]) => {
    if (!currentAction) return;
    if (options.length === 0) return;
    const tempOptions: any = [];
    // const values = tabs.find(item => item.key === currentAction)
    options.forEach(item => {
      const cls = classnames({
        [styles.item]: true,
        [styles.current]:
          currentItemAction && currentItemAction.label === item.label,
      });
      tempOptions.push(
        <div
          className={cls}
          key={item.label}
          onClick={() => optionHandle(item, currentAction)}
        >
          {item.label}
        </div>,
      );
    });

    // eslint-disable-next-line consistent-return
    return tempOptions;
  };

  const maskHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRenderOptionsData([]);
    setMastShow(false);
    looseBody();
    if (!currentItemAction) {
      setCurrentAction(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const maskScrollEventsHandle: () => void = () => {};

  const renderMask = () => {
    maskScrollEventsHandle();
    const style = {
      // display: maskShow ? 'block' : 'none',
      backgroundColor: 'rgba(0,0,0,0.4)',
    };
    return (
      <div
        style={style}
        className={`${styles.selectMask_box} ${styles.mask}`}
        onClick={maskHandle}
      />
    );
  };

  return (
    <div className={styles.tab}>
      <Flex className={styles.header}>{renderTabs()}</Flex>
      <Flex direction="column" className={styles.options}>
        {renderOptions(renderOptionsData)}
      </Flex>
      {maskShow && renderMask()}
    </div>
  );
};

export default Filter;
