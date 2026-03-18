
# column-split


### 描述

通过拖动分隔条分配元素占比


### 安装

```shell
npm i --save @kne/column-split
```


### 概述

column-split 是一个轻量级的 React 组件，用于通过拖动分隔条动态分配元素的占比。它支持多种状态（正常、只读、禁用），并提供了丰富的自定义选项，如颜色、标题等。

### 特点
- **动态调整**：用户可以通过拖动分隔条实时调整各列的占比。
- **多种状态**：支持正常、只读和禁用状态，满足不同场景需求。
- **自定义样式**：每列可以自定义颜色和标题，提升用户体验。
- **轻量高效**：基于 React 和 Ant Design 构建，性能优异且易于集成。

### 示例

#### 示例代码

- 基础示例
- 展示 ColumnSplit 组件的基本用法，包括正常、只读、禁用三种状态。
- _ColumnSplit(@kne/current-lib_column-split)[import * as _ColumnSplit from "@kne/column-split"],(@kne/current-lib_column-split/dist/index.css),antd(antd)

```jsx
const { default: ColumnSplit } = _ColumnSplit;
const { Flex, Divider } = antd;

const BaseExample = () => {
  const columns = [
    {
      name: 'frontend',
      title: '前端开发',
      color: '#5386FA'
    },
    {
      name: 'backend',
      title: '后端开发',
      color: '#8B5CF6'
    },
    {
      name: 'testing',
      title: '测试',
      color: '#FCD34D'
    }
  ];

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={8}>
        <Divider orientation="left">正常状态</Divider>
        <ColumnSplit columns={columns} />
      </Flex>

      <Flex vertical gap={8}>
        <Divider orientation="left">只读状态</Divider>
        <ColumnSplit readOnly columns={columns} />
      </Flex>

      <Flex vertical gap={8}>
        <Divider orientation="left">禁用状态</Divider>
        <ColumnSplit disabled columns={columns} />
      </Flex>
    </Flex>
  );
};

render(<BaseExample />);

```

- 受控模式
- 展示 ColumnSplit 的受控模式用法，通过 value 和 onChange 控制列宽分配。
- _ColumnSplit(@kne/current-lib_column-split)[import * as _ColumnSplit from "@kne/column-split"],(@kne/current-lib_column-split/dist/index.css),antd(antd)

```jsx
const { default: ColumnSplit } = _ColumnSplit;
const { Flex, Divider, Button, Space } = antd;
const { useState } = React;

const ControlledExample = () => {
  const columns = [
    {
      name: 'must',
      title: '必修课',
      color: '#EF4444'
    },
    {
      name: 'elective',
      title: '选修课',
      color: '#3B82F6'
    },
    {
      name: 'practice',
      title: '实践课',
      color: '#10B981'
    }
  ];

  const [value, setValue] = useState({
    must: 0.5,
    elective: 0.3,
    practice: 0.2
  });

  const handleReset = () => {
    setValue({
      must: 1 / 3,
      elective: 1 / 3,
      practice: 1 / 3
    });
  };

  const handleEqualDistribution = () => {
    setValue({
      must: 0.4,
      elective: 0.4,
      practice: 0.2
    });
  };

  return (
    <Flex vertical gap={16}>
      <Divider orientation="left">受控模式 - 课程学分占比分配</Divider>
      
      <Space>
        <Button size="small" onClick={handleReset}>
          平均分配
        </Button>
        <Button size="small" onClick={handleEqualDistribution}>
          4:4:2 分配
        </Button>
      </Space>

      <ColumnSplit columns={columns} value={value} onChange={setValue} />

      <Flex vertical gap={4}>
        <div>当前值：</div>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<ControlledExample />);

```

- 高级功能
- 展示 ColumnSplit 的高级功能，包括最小/最大占比限制、自定义渲染、allowZero 等特性。
- _ColumnSplit(@kne/current-lib_column-split)[import * as _ColumnSplit from "@kne/column-split"],(@kne/current-lib_column-split/dist/index.css),antd(antd)

```jsx
const { default: ColumnSplit } = _ColumnSplit;
const { Flex, Divider, Space, Switch, Typography } = antd;
const { useState } = React;

const AdvancedExample = () => {
  const [allowZero, setAllowZero] = useState(false);

  // 带最小/最大占比限制的列配置
  const columnsWithLimits = [
    {
      name: 'core',
      title: '核心业务',
      color: '#EF4444',
      min: 0.3,
      max: 0.7,
      render: ({ value }) => `${Math.round(value * 100)}% (核心)`
    },
    {
      name: 'growth',
      title: '增长业务',
      color: '#3B82F6',
      min: 0.2,
      max: 0.5
    },
    {
      name: 'exploration',
      title: '探索业务',
      color: '#10B981',
      min: 0.1,
      max: 0.3
    }
  ];

  // 点击隐藏列示例 - 更多列便于演示
  const columnsForAllowZero = [
    {
      name: 'frontend',
      title: '前端',
      color: '#3B82F6'
    },
    {
      name: 'backend',
      title: '后端',
      color: '#8B5CF6'
    },
    {
      name: 'testing',
      title: '测试',
      color: '#10B981'
    },
    {
      name: 'devops',
      title: '运维',
      color: '#F59E0B'
    },
    {
      name: 'design',
      title: '设计',
      color: '#EC4899'
    }
  ];

  // 自定义渲染列内容的示例
  const columnsWithRenderItem = [
    {
      name: 'revenue',
      title: '营收',
      color: '#8B5CF6'
    },
    {
      name: 'profit',
      title: '利润',
      color: '#F59E0B'
    }
  ];

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={8}>
        <Divider orientation="left">最小/最大占比限制</Divider>
        <Typography.Text type="secondary">
          核心业务：30%-70% | 增长业务：20%-50% | 探索业务：10%-30%
        </Typography.Text>
        <ColumnSplit columns={columnsWithLimits} />
      </Flex>

      <Flex vertical gap={8}>
        <Divider orientation="left">自定义 render 函数</Divider>
        <Typography.Text type="secondary">
          核心业务列使用自定义 render 显示格式化文本
        </Typography.Text>
        <ColumnSplit columns={columnsWithLimits} />
      </Flex>

      <Flex vertical gap={8}>
        <Divider orientation="left">allowZero - 点击隐藏列</Divider>
        <Space align="center">
          <span>允许隐藏列：</span>
          <Switch checked={allowZero} onChange={setAllowZero} />
        </Space>
        <Typography.Text type="secondary">
          开启后可点击列将其隐藏（占比变为0），隐藏的列会显示在底部，点击可恢复。拖动调整占比始终可用。
        </Typography.Text>
        <ColumnSplit
          columns={columnsForAllowZero}
          allowZero={allowZero}
        />
      </Flex>

      <Flex vertical gap={8}>
        <Divider orientation="left">自定义 renderItem</Divider>
        <Typography.Text type="secondary">
          使用 renderItem 完全自定义列内容渲染
        </Typography.Text>
        <ColumnSplit
          columns={columnsWithRenderItem}
          renderItem={({ item, value, valueStr, el, index }) => (
            <Flex vertical align="center" justify="center" style={{ width: '100%', height: '100%' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</div>
              <div style={{ fontSize: 24, color: item.color, fontWeight: 'bold', marginTop: 8 }}>
                {valueStr}
              </div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                序号：{index + 1}
              </div>
            </Flex>
          )}
        />
      </Flex>
    </Flex>
  );
};

render(<AdvancedExample />);

```


### API

### ColumnSplit

通过拖动分隔条动态分配元素占比的 React 组件，支持多种状态和丰富的自定义选项。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `columns` | `Array<Object>` | `[]` | 列配置数组，详见下方列配置说明 |
| `className` | `string` | - | 自定义组件类名 |
| `renderItem` | `Function` | - | 自定义列内容渲染函数，参数为 `{ item, value, valueStr, el, index }` |
| `readOnly` | `boolean` | `false` | 是否只读模式，禁止调整列宽 |
| `disabled` | `boolean` | `false` | 是否禁用模式，禁止调整列宽 |
| `allowZero` | `boolean` | `false` | 是否允许点击列将其隐藏（占比为0），隐藏的列显示在底部可恢复 |
| `defaultValue` | `Object` | - | 当前列宽比例值（非受控模式），键为列名，值为比例（0-1） |
| `value` | `Object` | - | 当前列宽比例值（受控模式），键为列名，值为比例（0-1） |
| `onChange` | `Function` | - | 列宽调整回调函数，参数为调整后的 `value` 对象 |

#### 列配置 (`columns`)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `name` | `string` | - | 列的唯一标识（必填） |
| `title` | `string` | - | 列的标题 |
| `color` | `string` | - | 列的颜色（支持 CSS 颜色值） |
| `min` | `number` | - | 列的最小占比（0-1） |
| `max` | `number` | - | 列的最大占比（0-1） |
| `render` | `Function` | - | 自定义列值渲染函数，参数为 `{ value }`，返回显示的占比文本 |

#### renderItem 参数说明

`renderItem` 函数接收一个对象参数，包含以下属性：

| 属性 | 类型 | 描述 |
|------|------|------|
| `item` | `Object` | 当前列的配置对象 |
| `value` | `number` | 当前列的占比值（0-1） |
| `valueStr` | `string` | 格式化后的占比文本（如 "50%"） |
| `el` | `ReactElement` | 默认渲染的元素 |
| `index` | `number` | 当前列的索引 |

#### 使用场景

- 课程学分占比分配
- 业务资源分配
- 时间分配管理
- 投资组合配置

