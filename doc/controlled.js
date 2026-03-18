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
