import React, {useState, useEffect} from "react";
import {Button, Card, Modal, Form, InputNumber, Input, Radio, Checkbox} from "antd";
import {isMobile, isDesktop, isChrome} from 'react-device-detect';
import {footerAgreement, footerAgreementLink } from "../../util/config";

const paymentMethods = require("../../contract/paymentmethods.json");
const DEBUG = ("true"===process.env.REACT_APP_DEBUG);

const Withdraw = ({item, address, withdraw}) => {


  const [modalText, setModalText] = useState("Please specify the amount to be withdrawn from account "
  											+ address + " and payment method");
  
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Withdraw " + item.token);
  const [paymentMethodDescription, setPaymentMethodDescription] = useState(paymentMethods[0].description);
  const [amount, setAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [okDisabled, setOkDisabled] = useState(true);


  const showModal = () => {

      setVisible(true);
      setModalText("Please specify the amount to be withdrawn from account "
  											+ address + " and payment method");
      setLoading(false);

  };

      useEffect(() => {
            async function checkOkButton() {

                const newOkDisabled = (Number(amount)>= 5 && accepted===true)? false : true;
                if( newOkDisabled !== okDisabled) setOkDisabled(newOkDisabled);


        }
      checkOkButton()
      },[amount, accepted]);


  const handleOk = async () => {

      setModalText('Preparing withdraw...');
      setLoading( true );
	  
	  await withdraw(address, amount, paymentMethod, item.address);
  
      setVisible(false);
     
     // call contract
  };

  const handleCancel = () => {
      setVisible(false);
  };

  const handleChange = (values) => {
  if(DEBUG) console.log("Withdraw values changed", values);
      if( values.amount !== undefined) setAmount(values.amount);
      if( values.comment !== undefined) setComment(values.comment);
      if( values.paymentMethod !== undefined) 
      {
      	setPaymentMethod( values.paymentMethod );
      	setPaymentMethodDescription(paymentMethods[values.paymentMethod].description);
      }
      if( values.accepted !== undefined) setAccepted( values.accepted);
      if( values.email !== undefined) setEmail( values.email);
      if( values.sendEmail!== undefined) setSendEmail( values.sendEmail);
  };


    return (
        <span>
        {( isChrome===true && isDesktop===true && address !== "")?(
        <Button type="primary"
            onClick={showModal}
            key="buttonw"
          >
          Withdraw
          </Button>):("")}
        <Modal title={title}
               visible={visible}
               onOk={handleOk}
               confirmLoading={loading}
               onCancel={handleCancel}
               footer={null}
        >
          <p>{modalText}</p>
        <Form
        onValuesChange = {handleChange}
        key="formw"
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          paymentMethod: 0,
          comment: "",
          amount: 1000,
          sendEmail:false,
          email:"",
          accepted:false
        }}
      >
        <Form.Item
          name="amount"
          key="amount"
          label="Amount"
          rules={[
              {
              required: true,
              message: 'Please input the the amount to be withdrawn',
            },
          ]}
        >

        
          <InputNumber
            style={{width: 300}}
            min={10}
            defaultValue="1000"
    		min="0"
    		max="1000000000"
            step="0.01"
            stringMode
            key="inputw"
          />
        </Form.Item>
        <Form.Item
            name="commission"
            key="commission"
            >
        Safe Transfers LLC commission on withdraw is 1%
        </Form.Item>

        <Form.Item
            name="sendEmail"
            key="sendEmail"
            valuePropName="checked"
            >
        <Checkbox>Notify me by e-mail when withdraw will be processed</Checkbox>
        </Form.Item>

        <Form.Item
            name="email"
            key="email"
            label="E-mail"
            hidden={!sendEmail}
            rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail',
          }
        ]}
            >
          <Input type="textarea"  />
        </Form.Item>
        {/*}
        <Form.Item name="comment" label="Comment">
          <Input type="textarea" />
        </Form.Item>
        */}
        <Form.Item name="paymentMethod" >
          <Radio.Group>
           {paymentMethods.map(method => (
            <Radio value={method.id}  key={method.id+item.token}>{method.name}</Radio>
         ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
            name="paymentMethodDescription"
            key="paymentMethodDescription"
            >
        {paymentMethodDescription}
        </Form.Item>

        <Form.Item
            name="accepted"
            key="accepted"
            valuePropName="checked"
            rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('You should accept agreement')),
          },
        ]}
            >
        <Checkbox>I accept <a href={footerAgreementLink} target="_blank">Safe Transfers LLC {footerAgreement}</a></Checkbox>
        </Form.Item>
        <Form.Item
            name="withdraw" 
            key="withdraw" 
            className="paymentMethod-sell-form_last-form-item"
            >

            <Button
                 type="primary"
                 key="withdrawbutton"
                 onClick={handleOk}
                 disabled={okDisabled}
                 loading={loading}
            >
            Withdraw
            </Button>
          </Form.Item>

      </Form>

        </Modal>
       </span>
    );
};

export default Withdraw;
