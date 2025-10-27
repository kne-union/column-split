### API 文档

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | `Array<Object>` | `[]` | 列配置数组，每列包含 `name`（唯一标识）、`title`（标题）、`color`（颜色）等属性。 |
| `readOnly` | `boolean` | `false` | 是否只读模式，禁止用户调整列占比。 |
| `disabled` | `boolean` | `false` | 是否禁用模式，禁止用户交互。 |
| `onChange` | `Function` | - | 列占比变化时的回调函数，参数为调整后的占比对象。 |

### 列配置 (`columns`)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | - | 列的唯一标识。 |
| `title` | `string` | - | 列的标题。 |
| `color` | `string` | - | 列的颜色（支持 CSS 颜色值）。 |
| `min` | `number` | - | 列的最小占比（0-1）。 |
| `max` | `number` | - | 列的最大占比（0-1）。 |