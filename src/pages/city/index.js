import React, { Component } from 'react';
import Utils from '../../utils/utils'
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import Axios from '../../axios';

const FormItem = Form.Item;
const Option = Select.Option;

class CityIndex extends Component {
  state = {
    list: [],
    isShowOpenCity: false
  }
  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }
  handleOpenCity = () => {
    this.setState({ isShowOpenCity: true });
  }
  // 请求数据
  requestList = () => {
    let _this = this;
    Axios.axios({
      url: '/open_city',
      data: {
        params: {
          page: this.page
        }
      }
    }).then(res => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.requestList();
        })
      });
    })
  }
  render() {
    const columns = [
      {
          title:'城市ID',
          dataIndex:'id'
      }, {
          title: '城市名称',
          dataIndex: 'name'
      }, {
          title: '用车模式',
          dataIndex: 'mode',
          render(mode){
              return mode === 1 ?'停车点':'禁停区';
          }
      }, {
          title: '营运模式',
          dataIndex: 'op_mode',
          render(op_mode) {
              return op_mode === 1 ? '自营' : '加盟';
          }
      }, {
          title: '授权加盟商',
          dataIndex: 'franchisee_name'
      }, {
          title: '城市管理员',
          dataIndex: 'city_admins',
          render(arr){
              return arr.map((item)=>{
                  return item.user_name;
              }).join(',');
          }
      }, {
          title: '城市开通时间',
          dataIndex: 'open_time'
      }, {
          title: '操作时间',
          dataIndex: 'update_time',
          render: Utils.formateDate
      }, {
          title: '操作人',
          dataIndex: 'sys_user_name'
      }
  ]
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <Table
          bordered
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}
        />
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => this.setState({ isShowOpenCity: false })}
          onOk={this.submitOpenCity}
        >
          <OpenCityForm />
        </Modal>
      </div>
    );
  }
}

class FilterForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
          <FormItem label="城市">
              {
                  getFieldDecorator('city_id')(
                      <Select
                          style={{width:100}}
                          placeholder="全部"
                      >
                          <Option value="">全部</Option>
                          <Option value="1">北京市</Option>
                          <Option value="2">天津市</Option>
                          <Option value="3">深圳市</Option>
                      </Select>
                  )
              }
          </FormItem>
          <FormItem label="用车模式">
              {
                  getFieldDecorator('mode')(
                      <Select
                          style={{ width: 120 }}
                          placeholder="全部"
                      >
                          <Option value="">全部</Option>
                          <Option value="1">指定停车点模式</Option>
                          <Option value="2">禁停区模式</Option>
                      </Select>
                  )
              }
          </FormItem>
          <FormItem label="营运模式">
              {
                  getFieldDecorator('op_mode')(
                      <Select
                          style={{ width: 80 }}
                          placeholder="全部"
                      >
                          <Option value="">全部</Option>
                          <Option value="1">自营</Option>
                          <Option value="2">加盟</Option>
                      </Select>
                  )
              }
          </FormItem>
          <FormItem label="加盟商授权状态">
              {
                  getFieldDecorator('auth_status')(
                      <Select
                          style={{ width: 100 }}
                          placeholder="全部"
                      >
                          <Option value="">全部</Option>
                          <Option value="1">已授权</Option>
                          <Option value="2">未授权</Option>
                      </Select>
                  )
              }
          </FormItem>
          <FormItem>
              <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
              <Button>重置</Button>
          </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm)

class OpenCityForm extends React.Component{
  render(){
    const formItemLayout = {
        labelCol:{
            span:5
        },
        wrapperCol:{
            span:19
        }
    }
    const { getFieldDecorator }  =this.props.form;
    return (
      <Form layout="horizontal">
        <FormItem label="选择城市" {...formItemLayout}>
            {
                getFieldDecorator('city_id',{
                    initialValue:'1'
                })(
                    <Select style={{ width: 100 }}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                )
            }
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
            {
                getFieldDecorator('op_mode', {
                    initialValue: '1'
                })(
                    <Select style={{ width: 100 }}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                )
            }
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
            {
                getFieldDecorator('use_mode', {
                    initialValue: '1'
                })(
                    <Select style={{ width: 100 }}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                )
            }
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm);

export default CityIndex;

