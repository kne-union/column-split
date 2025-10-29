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