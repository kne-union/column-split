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
