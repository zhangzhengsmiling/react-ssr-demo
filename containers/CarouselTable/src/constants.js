import React from 'react';

const data = [
  { key1: 'aaa1', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa2', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa3', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa4', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa5', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa6', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa7', key2: '222', key3: '333', key4: '444', key5: '555' },
  { key1: 'aaa8', key2: '222', key3: '333', key4: '444', key5: '555' },
]

const columns = [
  {
    key: 'key1',
    name: '字段1',
    render: (record) => {
      return <div style={{ width: '100%', height: '10px', textAlign: 'center' }}>
        <div style={{ width: '10px', height: '10px', background: 'rgb(54, 117, 162)', borderRadius: '50%', display: 'inline-block' }} />
      </div>;
    }
  },
  {
    key: 'key2',
    name: '字段2',
    render: (record) => {
      return record.key2;
    }
  },
  {
    key: 'key3',
    name: '字段3',
    render: (record) => {
      return record.key3;
    }
  },
  {
    key: 'key4',
    name: '字段4',
    render: (record) => {
      return record.key4;
    }
  },
  {
    key: 'key5',
    name: '字段5',
    render: (record) => {
      return record.key5;
    }
  }
]

export {
  data,
  columns,
};
