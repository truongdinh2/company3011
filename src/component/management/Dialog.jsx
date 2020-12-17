
import { Form, Input, InputNumber, Button, message } from 'antd';
import { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Diaolog = (props) => {
  const [form] = Form.useForm();
  const checkEdit = props.checkEdit;
  // const 
  // const [idValue, setIdValue] = useState(id);
  const [userEdits, setUserEdits] = useState(props.users);
  // console.log(idValue)
  useEffect(() => {
    // console.log(userEdits)
    form.setFieldsValue(
      checkEdit === false ? { user: userEdits } : '');

  });
  const onFinish = async values => {
    if (!userEdits) {
      fetch("https://5fbb65b4c09c200016d406f6.mockapi.io/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.user),
      }).then(() => {
        props.checkData();
        success()
      });
    } else {
      fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/info/${userEdits.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.user),
      }).then(res => {
        props.checkData();
        setUserEdits(null);
        success();
        // alert('hi')
      });
    }
    success();
    props.getSave()
  };

  const success = () => {
    message.success('done !');
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}
      validateMessages={validateMessages}
      form={form}>
      <Form.Item value="hihi" name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input

        />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' },
      { required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']}
        label="Age" rules={[{ type: 'number', min: 0, max: 99 }, { required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website" rules={[{ required: true }]}
      rules={[{type: 'url'}]} >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className="btn"
        // onClick={()=>{setUserEdits(null)}}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>


  );
};
export default Diaolog;


