import React, {useState, useEffect} from "react";
import {Button, Card, Modal, Form, InputNumber, Input, Radio, Checkbox} from "antd";
import {isMobile, isDesktop, isChrome} from 'react-device-detect';
import {footerAgreement, footerAgreementLink } from "../../util/config";

const paymentMethods = require("../../contract/paymentmethods.json");
const DEBUG = ("true"===process.env.REACT_APP_DEBUG);

const Deposit = ({item, address, deposit}) => {


  const [modalText, setModalText] = useState("Please specify the amount to be deposited to account "
  											+ address + " and payment method");
  
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Deposit " + item.token);
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
      setModalText("Please specify the amount to be deposited to account "
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

      setModalText('Preparing deposit...');
      setLoading( true );
	  
	  await deposit(address, amount, paymentMethod, item.address);
  
      setVisible(false);
     
     // call contract
  };

  const handleCancel = () => {
      setVisible(false);
  };

  const handleChange = (values) => {
  if(DEBUG) console.log("Deposit values changed", values);
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
            key="buttond"
          >
          Deposit
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
        key="formd"
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
          key="amountd"
          label="Amount"
          rules={[
              {
              required: true,
              message: 'Please input the the amount to be deposited',
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
            key="inputd"
          />
        </Form.Item>
        <Form.Item
            name="commission"
            key="commissiond"
            >
        Safe Transfers LLC commission on deposit is 1%
        </Form.Item>

        <Form.Item
            name="sendEmail"
            key="sendEmaild"
            valuePropName="checked"
            >
        <Checkbox>Notify me by e-mail when deposit will be processed</Checkbox>
        </Form.Item>

        <Form.Item
            name="email"
            key="emaild"
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
            <Radio value={method.id}  key={method.id+item.token + "d"}>{method.name}</Radio>
         ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
            name="paymentMethodDescription"
            key="paymentMethodDescriptiond"
            >
        {paymentMethodDescription}
        </Form.Item>

        <Form.Item
            name="accepted"
            key="acceptedd"
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
            name="deposit" 
            key="depositd" 
            className="paymentMethod-sell-form_last-form-item"
            >

            <Button
                 type="primary"
                 key="depositbutton"
                 onClick={handleOk}
                 disabled={okDisabled}
                 loading={loading}
            >
            Deposit
            </Button>
          </Form.Item>

      </Form>

        </Modal>
       </span>
    );
};

export default Deposit;
