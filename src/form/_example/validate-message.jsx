import React, { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  MessagePlugin,
  Radio,
  Select,
} from 'tdesign-react';

const { FormItem } = Form;

const defaultValidateMessage = {
  account: [
    {
      type: 'error',
      message: '自定义用户名校验信息提示',
    },
  ],
  description: [
    {
      type: 'error',
      message: '自定义个人简介校验信息提示',
    },
  ],
  password: [
    {
      type: 'warning',
      message: '自定义密码校验信息提示',
    },
  ],
};

const rules = {
  account: [
    { required: true },
    { min: 2 },
    { max: 10, type: 'warning' },
  ],
  description: [
    { validator: (val) => val.length >= 5 },
    { validator: (val) => val.length < 10, message: '不能超过 20 个字，中文长度等于英文长度' },
  ],
  password: [
    { required: true },
    { len: 8, message: '请输入 8 位密码' },
    { pattern: /[A-Z]+/, message: '密码必须包含大写字母' },
  ],
  email: [{ required: true }, { email: { ignore_max_length: true } }],
  gender: [{ required: true }],
  course: [{ required: true }, { validator: (val) => val.length <= 2, message: '最多选择 2 门课程', type: 'warning' }],
  'content.url': [
    { required: true },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
    },
  ],
};

const courseOptions = [
  { label: '语文', value: '1' },
  { label: '数学', value: '2' },
  { label: '英语', value: '3' },
  { label: '体育', value: '4' },
];

const options = [
  { label: '计算机学院', value: '1' },
  { label: '软件学院', value: '2' },
  { label: '物联网学院', value: '3' },
];

export default function BaseForm() {
  const [validateMessage, setValidateMessage] = useState(defaultValidateMessage);

  const onSubmit = ({ validateResult, firstError }) => {
    if (validateResult === true) {
      MessagePlugin.success('提交成功');
    } else {
      console.log('Errors: ', validateResult);
      MessagePlugin.warning(firstError);
    }
  };

  const onReset = () => {
    MessagePlugin.info('重置成功');
    setValidateMessage({});
  };

  const handleValidateMessage = () => {
    MessagePlugin.success('设置表单校验信息提示成功');
    setValidateMessage(defaultValidateMessage);
  }

  return (
    <Form
      rules={rules}
      validateMessage={validateMessage}
      onReset={onReset}
      onSubmit={onSubmit}
      scrollToFirstError="smooth"
    >
      <FormItem label="用户名" help="这是用户名字段帮助说明" name="account">
        <Input />
      </FormItem>
      <FormItem label="个人简介" help="一句话介绍自己" name="description">
        <Input />
      </FormItem>
      <FormItem label="密码" name="password">
        <Input type="password" />
      </FormItem>
      <FormItem label="邮箱" name="email">
        <Input />
      </FormItem>
      <FormItem label="性别" name="gender">
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="femal">女</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem label="课程" name="course">
        <Checkbox.Group options={courseOptions}></Checkbox.Group>
      </FormItem>
      <FormItem label="学院" name="college">
        <Select clearable>
          {options.map((item, index) => (
            <Select.Option value={item.value} label={item.label} key={index} />
          ))}
        </Select>
      </FormItem>
      <FormItem
        label="入学时间"
        name="date"
        rules={[{ date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' }]}
      >
        <Input />
      </FormItem>
      <FormItem label="个人网站" name="content.url">
        <Input />
      </FormItem>
      <FormItem style={{ paddingTop: 8 }}>
        <Button theme="primary" type="submit" style={{ marginRight: 10 }}>
          提交
        </Button>
        <Button theme="default" variant="base" type="reset" style={{ marginRight: 10 }}>
          重置
        </Button>
        <Button theme="default" variant="base" onClick={handleValidateMessage}>
          设置校验信息提示
        </Button>
      </FormItem>
    </Form>
  );
}
