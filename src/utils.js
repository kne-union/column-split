import get from 'lodash/get';
import transform from 'lodash/transform';

/**
 * 根据拖动大小计算新的列宽值
 * @param {Array} activeColumns - 当前活跃的列配置数组
 * @param {Array<number>} sizes - 拖动后的各列大小
 * @param {Object} currentValue - 当前的值对象
 * @param {Array} disabledColumns - 当前隐藏的列配置数组
 * @returns {Object} 新的值对象
 */
export const calculateResizeValues = (activeColumns, sizes, currentValue, disabledColumns = []) => {
  if (!activeColumns || activeColumns.length === 0) {
    return currentValue;
  }

  const total = sizes.reduce((sum, target) => sum + target, 0);
  const last = activeColumns[activeColumns.length - 1];
  let otherValue = 0;

  const newValue = transform(
    activeColumns,
    (result, { name }, index) => {
      result[name] = Math.round((100 * sizes[index]) / total) / 100;
      if (name !== last.name) {
        otherValue += result[name];
      }
    },
    {}
  );

  // 修正最后一个值确保总和为1
  newValue[last.name] = Math.round(100 * (1 - otherValue)) / 100;

  // 赋值其他隐藏列的值
  disabledColumns.forEach(column => {
    newValue[column.name] = 0;
  });

  return newValue;
};

/**
 * 计算隐藏某列后的新值
 * @param {Object} currentValue - 当前的值对象
 * @param {Object} columnToHide - 要隐藏的列配置
 * @param {Array} activeColumns - 当前活跃的列配置数组
 * @returns {Object|null} 新的值对象，如果无法隐藏则返回 null
 */
export const hideColumn = (currentValue, columnToHide, activeColumns) => {
  if (!activeColumns || activeColumns.length <= 1) {
    return null;
  }

  const columnValue = get(currentValue, columnToHide.name) || 1 / activeColumns.length;
  const otherColumns = activeColumns.filter(col => col.name !== columnToHide.name);

  // 计算每列可接受的最大额外宽度
  const availableSpace = otherColumns.map(col => {
    const currentVal = get(currentValue, col.name) || 1 / activeColumns.length;
    const maxVal = typeof col.max === 'number' ? col.max : 1;
    return Math.max(0, maxVal - currentVal);
  });
  const totalAvailable = availableSpace.reduce((sum, v) => sum + v, 0);

  // 如果没有足够空间，则不执行隐藏
  if (totalAvailable < columnValue - 0.001) {
    return null;
  }

  // 按可用空间比例分配
  const newValue = Object.assign({}, currentValue);
  newValue[columnToHide.name] = 0;

  if (totalAvailable > 0) {
    otherColumns.forEach((col, index) => {
      const currentVal = get(currentValue, col.name) || 1 / activeColumns.length;
      const addValue = (availableSpace[index] / totalAvailable) * columnValue;
      newValue[col.name] = Math.min(1, currentVal + addValue);
    });
  }

  // 修正确保总和为1
  const total = Object.keys(newValue).reduce((sum, key) => {
    return activeColumns.find(col => col.name === key) ? sum + newValue[key] : sum;
  }, 0);
  const lastActiveCol = otherColumns[otherColumns.length - 1];
  if (lastActiveCol && Math.abs(total - 1) > 0.001) {
    newValue[lastActiveCol.name] = Math.round((1 - (total - newValue[lastActiveCol.name])) * 100) / 100;
  }

  return newValue;
};

/**
 * 计算恢复某列后的新值
 * @param {Object} currentValue - 当前的值对象
 * @param {Object} columnToShow - 要恢复的列配置
 * @param {Array} activeColumns - 当前活跃的列配置数组
 * @returns {Object} 新的值对象
 */
export const showColumn = (currentValue, columnToShow, activeColumns) => {
  // 计算每列可释放的最小额外宽度（当前值 - min）
  const reducibleSpace = activeColumns.map(col => {
    const currentVal = get(currentValue, col.name) || 1 / activeColumns.length;
    const minVal = typeof col.min === 'number' ? col.min : 0;
    return Math.max(0, currentVal - minVal);
  });
  const totalReducible = reducibleSpace.reduce((sum, v) => sum + v, 0);

  // 计算恢复列需要的宽度
  const targetMin = typeof columnToShow.min === 'number' ? columnToShow.min : 0;
  const targetMax = typeof columnToShow.max === 'number' ? columnToShow.max : 1;
  // 恢复列的目标宽度，取平均分配的值或可用空间中的较小者
  const targetValue = Math.min(targetMax, Math.max(targetMin, 1 / (activeColumns.length + 1)));

  // 实际分配给恢复列的宽度
  const actualTarget = Math.min(targetValue, totalReducible);

  const newValue = Object.assign({}, currentValue);
  newValue[columnToShow.name] = actualTarget;

  if (totalReducible > 0 && actualTarget > 0) {
    // 按比例分配，确保各列不低于 min
    let remainingToDistribute = actualTarget;

    // 先尝试按比例分配
    activeColumns.forEach((col, idx) => {
      if (remainingToDistribute <= 0) return;

      const currentVal = get(currentValue, col.name) || 1 / activeColumns.length;
      const minVal = typeof col.min === 'number' ? col.min : 0;
      const maxReduce = Math.max(0, currentVal - minVal);
      const reduceValue = Math.min(maxReduce, (reducibleSpace[idx] / totalReducible) * actualTarget);

      newValue[col.name] = currentVal - reduceValue;
      remainingToDistribute -= reduceValue;
    });

    // 如果还有未分配的宽度，从有空间的列中继续分配
    if (remainingToDistribute > 0.001) {
      activeColumns.forEach(col => {
        if (remainingToDistribute <= 0) return;

        const currentVal = newValue[col.name];
        const minVal = typeof col.min === 'number' ? col.min : 0;
        const canReduce = Math.max(0, currentVal - minVal);
        const reduceAmount = Math.min(canReduce, remainingToDistribute);

        newValue[col.name] = currentVal - reduceAmount;
        remainingToDistribute -= reduceAmount;
      });
    }
  }

  // 修正确保总和为1
  const total = Object.keys(newValue).reduce((sum, key) => sum + newValue[key], 0);
  if (Math.abs(total - 1) > 0.001) {
    // 找到第一个有足够宽度的列来修正
    for (const col of activeColumns) {
      const adjustAmount = 1 - total;
      if (newValue[col.name] + adjustAmount >= (typeof col.min === 'number' ? col.min : 0)) {
        newValue[col.name] = Math.round((newValue[col.name] + adjustAmount) * 100) / 100;
        break;
      }
    }
  }

  return newValue;
};

/**
 * 计算初始值
 * @param {Array} columns - 列配置数组
 * @returns {Object} 初始值对象
 */
export const calculateInitialValue = columns => {
  return transform(
    columns,
    (result, { name }) => {
      result[name] = 1 / columns.length;
    },
    {}
  );
};

/**
 * 计算列的最小值
 * @param {Object} column - 列配置
 * @param {number} defaultMin - 默认最小值
 * @returns {number} 最小值
 */
export const getColumnMin = (column, defaultMin = 0.01) => {
  return typeof column.min === 'number' ? Math.max(column.min, defaultMin) : defaultMin;
};

/**
 * 计算列的最大值
 * @param {Object} column - 列配置
 * @returns {number} 最大值
 */
export const getColumnMax = column => {
  return typeof column.max === 'number' ? column.max : 1;
};
