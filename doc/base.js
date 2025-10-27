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
