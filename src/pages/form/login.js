import React, { Component } from 'react'
import { Card, Form, message, Input, Icon, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class LoginForm extends Component {

  handleSubmit = e => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.success(
          `${userInfo.username} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`
        )
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单" className="card-wrap">
          <Form layout="inline">
            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="登录水平表单" className="card-wrap">
          <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 400}}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { min: 5, max: 10, message: '长度为5到10位'},
                  {pattern: /^\w+$/g, message: '用户名为字母或数字'}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="###" style={{float: 'right'}}>
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                Log in
              </Button>
              Or <a href="###">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create({ name: 'normal_login' })(LoginForm)
