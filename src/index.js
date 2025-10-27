import { Splitter, Flex } from 'antd';
import classnames from 'classnames';
import get from 'lodash/get';
import transform from 'lodash/transform';
import useControlValue from '@kne/use-control-value';
import { MoreOutlined } from '@ant-design/icons';
import style from './style.module.scss';

const ColumnSplit = ({ columns = [], className, readOnly, disabled, ...props }) => {
  const [value, onChange] = useControlValue(props);
  if (columns.length === 0) {
    return null;
  }
  return (
    <Splitter
      className={classnames(className, style['column-split'], {
        'read-only': readOnly,
        disabled
      })}
      onResize={sizes => {
        if (readOnly || disabled) {
          return;
        }
        const total = sizes.reduce((sum, target) => sum + target, 0);
        const last = columns[columns.length - 1];
        let otherValue = 0;
        const value = transform(
          columns,
          (result, { name }, index) => {
            result[name] = Math.round((100 * sizes[index]) / total) / 100;
            if (name !== last.name) {
              otherValue += result[name];
            }
          },
          {}
        );
        //修正value最后一个值;
        value[last.name] = Math.round(100 * (1 - otherValue)) / 100;
        onChange(value);
      }}
    >
      {columns.map((column, index) => {
        const itemValue = get(value, column.name) || 1 / columns.length;
        return (
          <Splitter.Panel
            key={column.name || index}
            min={column.min}
            max={column.max}
            size={`${100 * itemValue}%`}
            className={classnames(style['column-item'], 'column-item')}
            style={{
              '--color': column.color
            }}
          >
            <Flex vertical justify="center" align="center" className={classnames(style['column-item-content'], 'column-item-content')}>
              {column.title}
              <span>{`${Math.round(100 * itemValue)}%`}</span>
              {index < columns.length - 1 && (
                <Flex className={classnames(style['column-item-handler-left'], 'column-item-handler-left')}>
                  <MoreOutlined />
                </Flex>
              )}
              {index > 0 && (
                <Flex className={classnames(style['column-item-handler-right'], 'column-item-handler-right')}>
                  <MoreOutlined />
                </Flex>
              )}
            </Flex>
          </Splitter.Panel>
        );
      })}
    </Splitter>
  );
};

export default ColumnSplit;
