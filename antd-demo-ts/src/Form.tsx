import {Button, Form, Input} from 'antd';
import axios from 'axios';

const DonationForm = () => {

    const checkPriceInput = (rule:any, value:any, callback:any) => {
        const regex = /^£([0-9]+(\.[0-9]+)?)$/;
        if (!regex.test(value) || value<=0){
          callback('Please enter a valid price'); 
        } else {
          callback();
        }
      }
    
      const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      };
    
      const onSubmit = (e: any) =>{
        // console.log(e.Location);
        const url = "https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems";
        const formData = new FormData();

        formData.append("name", e.Name);
        formData.append("location", e.Location);
        formData.append("theme", e.Theme);
        // formData.append("price", e.Price)

        
        axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(
          res => {
            console.log(res.data)
          }
        )
        // console.log(formData);
      }



    return (
        <div className="App-header">
            <Form style={{ width: '500px'}} {...formLayout} onFinish={onSubmit}>
          <Form.Item 
          name="Name" 
          label="Name" 
          rules={[
            {required: true},
              {min: 1,
                message: "Name length cannot be 1 character"},
              {max: 200,
                message: "Name length cannot be more than 200 characters"},
          ]}>
            <Input placeholder="name"/>
          </Form.Item>

          <Form.Item 
          name="Location" 
          label="Location"
          rules={[
            {
              required: true,
            }

          ]}
          >
            <Input placeholder="location"/>
          </Form.Item>

          <Form.Item 
          name="Theme" 
          label="Theme"
          rules={[
            {
              required: true,
            }

          ]}
          >
            <Input placeholder="theme"/>
          </Form.Item>

          <Form.Item 
          name="Price" 
          label="Price"
          rules={[
            {
              required: false,
              validator: checkPriceInput
            }

          ]}
          >
            <Input placeholder="price"/>
          </Form.Item>

          <Form.Item name="Btn" wrapperCol={{offset: 2, span: 20}}>
            <Button block type="primary" htmlType="submit"> Add New Donation</Button>
          </Form.Item>

        </Form>
        </div>
    )
}

export default DonationForm;