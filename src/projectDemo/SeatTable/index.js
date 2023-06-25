import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';

const _nameList = [
  { name: '张三', userId: 1, label: '张三', value: 1 },
  { name: '李四', userId: 2, label: '李四', value: 2 },
  { name: '王武', userId: 3, label: '王武', value: 3 },
  { name: '哈哈', userId: 4, label: '哈哈', value: 4 },
  { name: '嘻嘻', userId: 5, label: '嘻嘻', value: 5 },
  { name: 'dfa', userId: 6, label: 'dfa', value: 6 },
];

export default function SeatTable() {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [tableData, setTableData] = useState();
  const [checked, setChecked] = useState({});

  const resetNameList = () => {
    _nameList.forEach((item) => (item.selected = false));
  };

  // 生成表格数据
  const handleGetTableData = () => {
    // 列 行
    const _data = [];

    resetNameList();

    for (let i = 0; i < col; i++) {
      const _rowData = [];
      for (let j = 0; j < row; j++) {
        if (tableData && tableData[i] && tableData[i][j]) {
          if (
            _nameList.find((item) => item.userId === tableData[i][j].userId)
          ) {
            _nameList.find(
              (item) => item.userId === tableData[i][j].userId
            ).selected = true;
          }
          _rowData.push(tableData[i][j]);
        } else {
          _rowData.push({ name: '', id: `${i}${j}`, col: i, row: j });
        }
      }
      _data.push(_rowData);
    }

    setTableData(_data);
  };

  // 选中名字
  const handleSelectName = (selectedName) => {
    if (checked.id) {
      if (checked.userId) {
        _nameList.find(
          (item) => item.userId === checked.userId
        ).selected = false;
      }
      checked.name = selectedName.name;
      checked.userId = selectedName.userId;
      selectedName.selected = true;
      setTableData([...tableData]);
    }
  };

  const handleMove = (type, index) => {
    if (type === 1) {
      // tableData[index].forEach((item) => {
      //   item.col = item.col - 1;
      //   item.id = `${item.col}${item.row}`;
      // });
      // tableData[index].forEach((item) => {
      //   item.col = item.col + 1;
      //   item.id = `${item.col}${item.row}`;
      // });
      const _temp = tableData[index];
      tableData[index] = tableData[index - 1];
      tableData[index - 1] = _temp;
    } else {
      // tableData[index].forEach((item) => {
      //   item.col = item.col + 1;
      //   item.id = `${item.col}${item.row}`;
      // });
      // tableData[index].forEach((item) => {
      //   item.col = item.col - 1;
      //   item.id = `${item.col}${item.row}`;
      // });
      const _temp = tableData[index];
      tableData[index] = tableData[index + 1];
      tableData[index + 1] = _temp;
    }
    setTableData([...tableData]);
  };

  // const renderTableItem = (colNum, rowNum) => {
  //   return (
  //     <div
  //       className={`table-item ${
  //         `${rowNum}${colNum}` === checked ? 'checked-table-item' : ''
  //       }`}
  //       onClick={() => setChecked(`${rowNum}${colNum}`)}
  //     >
  //       {colNum},{rowNum}
  //     </div>
  //   );
  // };

  const renderTableItem = (item) => {
    const { id, name } = item;
    return (
      <div
        className={`table-item ${
          id === checked.id ? 'checked-table-item' : ''
        }`}
        onClick={() => setChecked(item)}
      >
        <Select
          // mode='multiple'
          allowClear
          style={{
            width: '100%',
          }}
          placeholder='Please select'
          defaultValue={['a10', 'c12']}
          // onChange={handleChange}
          options={_nameList}
        />
      </div>
    );
  };

  // const renderSingle = (_, cloNum) => {
  //   return (
  //     <div className='rolContainer'>
  //       {new Array(Number(row))
  //         .fill(1)
  //         .map((_, rowNum) => renderTableItem(cloNum, rowNum))}
  //     </div>
  //   );
  // };

  const renderSingle = (list, index) => {
    return (
      <div className='rolContainer'>
        <div className='button'>
          <Button onClick={() => handleMove(1, index)}>左移</Button>
          <Button onClick={() => handleMove(2, index)}>右移</Button>
        </div>
        <div className='data-container'>{list.map(renderTableItem)}</div>
      </div>
    );
  };

  const renderNameItem = (item) => {
    return item.selected ? null : (
      <div
        className='name-item'
        onClick={() => {
          handleSelectName(item);
        }}
      >
        {item.name}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className='name-container'>{_nameList.map(renderNameItem)}</div>
      <div className='form-container'>
        <Input onChange={(e) => setCol(e.target.value)} key='col' />
        <Input onChange={(e) => setRow(e.target.value)} key='row' />
      </div>
      <Button onClick={handleGetTableData}>确定</Button>
      <div className='platform'>讲台</div>
      {/* <div className='table-part'>
        {new Array(Number(col)).fill(1).map(renderSingle)}
      </div> */}
      {tableData && (
        <div className='table-part'>{tableData.map(renderSingle)}</div>
      )}
    </div>
  );
}
