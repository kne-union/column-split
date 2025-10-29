
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
- 展示 column-split 组件的基本用法，包括正常状态、只读状态和禁用状态。
- _ColumnSplit(@kne/current-lib_column-split)[import * as _ColumnSplit from "@kne/column-split"],(@kne/current-lib_column-split/dist/index.css)

```jsx
const { default: ColumnSplit } = _ColumnSplit;

const BaseExample = () => {
  return (
    <div>
      <div>正常状态:</div>
      <ColumnSplit
        columns={[
          {
            name: 'softSkill',
            title: '软能力',
            color: '#5386FA'
          },
          {
            name: 'hardSkill',
            title: '硬能力',
            color: '#8B5CF6'
          },
          {
            name: 'ora',
            title: '英语口语',
            color: '#FCD34D'
          }
        ]}
      />
      <div>只读状态:</div>
      <ColumnSplit
        readOnly
        columns={[
          {
            name: 'softSkill',
            title: '软能力',
            color: '#5386FA'
          },
          {
            name: 'hardSkill',
            title: '硬能力',
            color: '#8B5CF6'
          },
          {
            name: 'ora',
            title: '英语口语',
            color: '#FCD34D'
          }
        ]}
      />
      <div>禁用状态:</div>
      <ColumnSplit
        disabled
        columns={[
          {
            name: 'softSkill',
            title: '软能力',
            color: '#5386FA'
          },
          {
            name: 'hardSkill',
            title: '硬能力',
            color: '#8B5CF6'
          },
          {
            name: 'ora',
            title: '英语口语',
            color: '#FCD34D'
          }
        ]}
      />
    </div>
  );
};

render(<BaseExample />);

```


### API

### API 文档

| 属性             | 类型              | 默认值                                                    | 说明 |
|----------------|-----------------|--------------------------------------------------------|----|
| `columns`      | `Array<Object>` | 列配置数组，每列包含 `name`、`title`、`min`、`max`、`color` 等属性。     |
| `className`    | `string`        | 自定义组件类名。                                               |
| `renderItem`   | `Function`      | 自定义列内容渲染函数，参数为 `{ item, value, valueStr, el, index }`。 |
| `readOnly`     | `boolean`       | 是否只读模式，禁止调整列宽。                                         |
| `disabled`     | `boolean`       | 是否禁用模式，禁止调整列宽。                                         |
| `defaultValue` | `Object`        | 当前列宽比例值，键为列名，值为比例（0-1）非受控模式。                           |
| `value`        | `Object`        | 当前列宽比例值，键为列名，值为比例（0-1）。                                |
| `onChange`     | `Function`      | 列宽调整回调函数，参数为调整后的 `value` 对象。                           |

### 列配置 (`columns`)

| 属性       | 类型         | 默认值                        | 说明                |
|----------|------------|----------------------------|-------------------|
| `name`   | `string`   | -                          | 列的唯一标识。           |
| `title`  | `string`   | -                          | 列的标题。             |
| `color`  | `string`   | -                          | 列的颜色（支持 CSS 颜色值）。 |
| `min`    | `number`   | -                          | 列的最小占比（0-1）。      |
| `max`    | `number`   | -                          | 列的最大占比（0-1）。      |
| `render` | `Function` | 自定义列值渲染函数，参数为 `{ value }`。 |
