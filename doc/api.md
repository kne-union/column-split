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
