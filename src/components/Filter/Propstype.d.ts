/**
 * 筛选组件
 * @param tabs []
 *   tab 子项： Object {
 *    key: string,
 *    text: string,
 *    params: {}
 *    }
 * @param defaultActionKey 默认激活的项
 * @param closePanel
 * @param onSelect 选择处理函数
 * @param independent 筛选项是否是独立 切换筛选项 不影响其他的筛选项
 * @returns {JSX.Element}
 * @constructor
 */

export interface FilterOptionItem {
  value: string;
  label: string;
}

export interface FilterOption {
  key: string;
  field: string;
  text: string;
  options: FilterOptionItem[];
}

export interface FilterProps {
  filter: FilterOption[];
  visible: boolean;
  defaultActionKey: string | null;
  onSelect?: (
    values: FilterOptionItem | Record<string, string>,
    key: string,
  ) => void;
  closePanel?: boolean;
  independent?: boolean;
}
