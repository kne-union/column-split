import { Splitter, Flex, Space, Button } from 'antd';
import classnames from 'classnames';
import get from 'lodash/get';
import useControlValue from '@kne/use-control-value';
import useRefCallback from '@kne/use-ref-callback';
import { MoreOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import { Fragment, useEffect } from 'react';
import { calculateResizeValues, hideColumn, showColumn, calculateInitialValue, getColumnMin, getColumnMax } from './utils';

const ColumnSplit = ({ columns = [], className, renderItem, readOnly, disabled, allowZero = false, ...props }) => {
  const [value, onChange] = useControlValue(props);
  const initValue = useRefCallback(() => {
    if (value) {
      return;
    }
    onChange(calculateInitialValue(columns));
  });
  useEffect(() => {
    initValue();
  }, [initValue]);
  if (columns.length === 0) {
    return null;
  }
  const activeColumns = columns.filter(column => {
    return get(value, column.name) !== 0;
  });
  const disabledColumns = columns.filter(column => {
    return get(value, column.name) === 0;
  });
  return (
    <Flex vertical gap={4} className={className}>
      <Splitter
        className={classnames(style['column-split'], {
          'read-only': readOnly,
          disabled
        })}
        onResize={sizes => {
          if (readOnly || disabled) {
            return;
          }
          const newValue = calculateResizeValues(activeColumns, sizes, value, disabledColumns);
          onChange(newValue);
        }}
      >
        {activeColumns.map((column, index) => {
          const itemValue = get(value, column.name) || 1 / activeColumns.length;
          const valueStr = typeof column.render === 'function' ? column.render({ value: itemValue }) : `${Math.round(100 * itemValue)}%`;
          const el = (
            <Flex vertical align="center" justify="center">
              {column.title}
              <span>{valueStr}</span>
            </Flex>
          );
          return (
            <Splitter.Panel
              key={column.name || index}
              min={`${getColumnMin(column) * 100}%`}
              max={`${getColumnMax(column) * 100}%`}
              size={`${100 * itemValue}%`}
              className={classnames(style['column-item'], 'column-item')}
              style={{
                '--color': column.color
              }}
            >
              <div
                className={classnames(style['column-item-content'], 'column-item-content', {
                  [style['can-hide']]: allowZero && !readOnly && !disabled && activeColumns.length > 1
                })}
              >
                <div
                  onClick={() => {
                    if (readOnly || disabled || !allowZero) {
                      return;
                    }
                    if (activeColumns.length <= 1) {
                      return;
                    }
                    const newValue = hideColumn(value, column, activeColumns);
                    if (newValue) {
                      onChange(newValue);
                    }
                  }}
                >
                  {typeof renderItem === 'function' ? renderItem({ item: column, value: itemValue, valueStr, el, index }) : el}
                </div>
                {activeColumns.length > 1 && index < activeColumns.length - 1 && (
                  <Flex className={classnames(style['column-item-handler-left'], 'column-item-handler-left')}>
                    <MoreOutlined />
                  </Flex>
                )}
                {activeColumns.length > 1 && index > 0 && (
                  <Flex className={classnames(style['column-item-handler-right'], 'column-item-handler-right')}>
                    <MoreOutlined />
                  </Flex>
                )}
              </div>
            </Splitter.Panel>
          );
        })}
      </Splitter>
      <Space.Compact block>
        {disabledColumns.map((column, index) => {
          const itemValue = 0;
          const valueStr = typeof column.render === 'function' ? column.render({ value: itemValue }) : `${Math.round(100 * itemValue)}%`;
          const el = (
            <Button
              variant="outlined"
              className={style['zero-item']}
              shape="round"
              size="small"
              style={{
                '--color': column.color
              }}
              onClick={() => {
                const newValue = showColumn(value, column, activeColumns);
                onChange(newValue);
              }}
            >
              <Flex align="center" justify="center">
                {column.title}
                <span>{valueStr}</span>
              </Flex>
            </Button>
          );
          return <Fragment key={column.name || index}>{typeof renderItem === 'function' ? renderItem({ item: column, value: itemValue, valueStr, el, index }) : el}</Fragment>;
        })}
      </Space.Compact>
    </Flex>
  );
};

export default ColumnSplit;
