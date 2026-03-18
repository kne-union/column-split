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
