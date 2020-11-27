
import { Form, Input, InputNumber, Button } from 'antd';
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
  const isEdit = props.isEdit;
  // const [idValue, setIdValue] = useState(id);
  const [userEdits, setUserEdits] = useState(props.users);
  // console.log(idValue)
  useEffect(() => {
    console.log(userEdits)
    form.setFieldsValue(
        isEdit === false ? {user:userEdits} : ''
      // {
      //   user: {
      //     name: userEdits.name,
      //     email: userEdits.email,
      //     age: userEdits.age,
      //     website: userEdits.website,
      //     introduction: userEdits.introduction,
      //   }
      // }
    )
  });
  const onFinish = async values => {
    // console.log(values.user)
    fetch("https://5fbb65b4c09c200016d406f6.mockapi.io/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values.user),
    }).then(res => {
      props.checkData();
    });
    fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/info/${userEdits.id}` , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEdits),
    })
  };
  // var name, email, age, website, introduction;
  // if(userEdits && props.isEdit === false) {
  //   name = userEdits.name;
  //   email = userEdits.email;
  //   age = userEdits.age;
  //   website = userEdits.website;
  //   introduction = userEdits.introduction;
  // }
  // console.log(id,idValue)
  console.log(props.isEdit)
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
        <Input  />
      </Form.Item>
      <Form.Item name={['user', 'age']} 
      label="Age" rules={[{ type: 'number', min: 0, max: 99 },{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>


  );
};
export default Diaolog;