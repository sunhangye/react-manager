import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from '../../axios/index'
// import MockData from '../../mock/data'
import Utiils from '../../utils/utils'
// console.log(MockData);

export default class BasicTable extends Component {
  state = {
    dataSource2: []
  }
  params = {
    page: 1
  }
  componentDidMount() {
    const data = [
      {
          id:'0',
          username:'Jack',
          sex:'1',
          state:'1',
          interest:'1',
          birthday:'2000-01-01',
          address:'北京市海淀区奥林匹克公园',
          time:'09:00'
      },
      {
          id: '1',
          username: 'Tom',
          sex: '1',
          state: '1',
          interest: '1',
          birthday: '2000-01-01',
          address: '北京市海淀区奥林匹克公园',
          time: '09:00'
      },
      {
          id: '2',
          username: 'Lily',
          sex: '1',
          state: '1',
          interest: '1',
          birthday: '2000-01-01',
          address: '北京市海淀区奥林匹克公园',
          time: '09:00'
      },
    ]
    data.map((item,index) => {
        item.key = index;
    })
    this.setState({ dataSource:  data});
    this.request()
  }
  request = () => {
    let _this = this
    axios.axios({
      url:'/table/list',
      
    }).then(res => {
      console.log(res.result);
      this.setState({
        dataSource2: res.result.list,
        pagination: Utiils.pagination(res, (current) => {
          _this.params.page = current;
          this.request();
        })
      });
    }).catch(error => {
      console.error(error)
    })
  }
  onRowClick = (record, index) => {
    console.log(record);
    
    // 多选为数组
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedItem: record
    });
    Modal.info({
      title: '提示信息',
      content: `用户名：${record.username}`
    })
  }
  deleteRow = () => {
    let ids = []
    let rows = this.state.selectedRows
    
    if (!rows) {
      Modal.info({
        title: '提示',
        content: '请选择后再删除'
      })
      return false;
    }
    console.log(rows);
    
    rows.map((item) => {
      ids.push(item.username)
    })
    Modal.confirm({
      title: '提示',
      content: `确定要删除${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request()
      }
    })
  }
  render() {
    const columns = [
        {
            title:'id',
            key:'id',
            dataIndex:'id'
        },
        {
            title: '用户名',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex){
                return sex === 1 ?'男':'女'
            }
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render(state){
                let config  = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time'
        }
    ]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'redio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    }
    return (
      <div>
        <Card title="基础表格" className="cart-wrap">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock-单选" className="cart-wrap">
            <Table
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={false}
                onRow={(record, index) => {
                  return {
                    onClick: () => this.onRowClick(record, index)
                  }
                }}
            />
        </Card>
        <Card title="动态数据渲染表格-Mock-多选" className="cart-wrap">
            <Button onClick={this.deleteRow}>删除</Button>
            <Table
                bordered
                rowSelection={rowCheckSelection}
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={false}
            />
        </Card>
        <Card title="动态数据渲染表格-Mock-分页" className="cart-wrap">
            <Table
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={this.state.pagination}
            />
        </Card>
      </div>
    )
  }
}
