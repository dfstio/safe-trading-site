import React, {useState, useEffect} from "react";
import {Button, Card, Modal, Form, InputNumber, Input, Radio, Checkbox, Row, Col} from "antd";
import {isMobile, isDesktop, isChrome} from 'react-device-detect';
import {footerAgreement, footerAgreementLink } from "../../util/config";


const paymentMethods = require("../../contract/paymentmethods.json");
const DEBUG = ("true"===process.env.REACT_APP_DEBUG);
var QRCode = require('qrcode.react');




const Deposit = ({item, address, deposit}) => {


  const [modalText, setModalText] = useState("Please specify the amount to be deposited to your account "
  											+ address);
  
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Deposit " + item.token);
  const [paymentMethodDescription, setPaymentMethodDescription] = useState(paymentMethods[0].description);
  const [paymentMethodAddress, setPaymentMethodAddress] = useState(paymentMethods[0].address);
  const [amount, setAmount] = useState(1000);
  const [qrText, setQRText] = useState(createQrCode(0,1000));
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [okDisabled, setOkDisabled] = useState(true);


  function createQrCode(id, value) {
        const qr = paymentMethods[id].prefix + paymentMethods[id].address + paymentMethods[id].suffix + (paymentMethods[id].decimals * value).toLocaleString('fullwide', {useGrouping:false});
        return qr;
      } 


  const showModal = () => {

      setVisible(true);
      setModalText("Please specify the amount to be deposited to your account "
  											+ address );
      setLoading(false);

  };

      useEffect(() => {
            async function checkOkButton() {

                const newOkDisabled = (Number(amount)>= 5 && accepted===true)? false : true;
                if( newOkDisabled !== okDisabled) setOkDisabled(newOkDisabled);


        }
      checkOkButton()
      },[amount, accepted]);


      useEffect(() => {
            async function generateQr() {
                setQRText(createQrCode(paymentMethod, amount));
        }
      generateQr()
      },[amount, paymentMethod]);


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
      	setPaymentMethodAddress(paymentMethods[values.paymentMethod].address);
      }
      if( values.accepted !== undefined) setAccepted( values.accepted);
      if( values.email !== undefined) setEmail( values.email);
      if( values.sendEmail!== undefined) setSendEmail( values.sendEmail);
  };


    return (
        <span >
        {( address !== "")?(
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
      <Row>
      <Col>
        <Form.Item
          name="amount"
          key="amountd"
          label="Amount"
          style={{ "marginBottom": "0px"}}
          rules={[
              {
              required: true,
              message: 'Please input the the amount to be deposited',
            },
          ]}
        >      
          <InputNumber
            style={{width: 300, "marginBottom": "0px"}}
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
            style={{"marginTop": "0px"}}
            >
        Safe Transfers LLC commission on deposit is 1%
        </Form.Item>
        <Form.Item 
        	name="paymentMethod"
        	label={"Payment method: " +  paymentMethodDescription}>    				
				  <Radio.Group>
				   {paymentMethods.map(method => (
					<Radio value={method.id}  key={method.id+item.token + "d"}>{method.name}</Radio>
				 ))}
				  </Radio.Group>
        </Form.Item>
        </Col>
        <Col>
        <Form.Item
            name="paymentMethodQR"
            key="paymentMethodQR" 
            >
            	<span>
        	    <QRCode
					 value={qrText}
					 size={300}
					 level='H'
					 includeMargin={true}
					 imageSettings={{src:"/payment/" + paymentMethods[paymentMethod].image,
                            width: 100,
                            height: 100
                            }}
					 />
				</span> 
        </Form.Item>
        </Col>
        </Row>
        <Form.Item
            name="paymentMethodDescription"
            key="paymentMethodDescriptiond"
            >
        {"Please transfer assets to Safe Trading LLC account " + paymentMethodAddress}
        </Form.Item>
        <Form.Item
            name="sendEmail"
            key="sendEmaild"
            valuePropName="checked"
            style={{"marginTop": "0px", "marginBottom": "0px"}}
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

         <Form.Item
            name="accepted"
            key="acceptedd"
            valuePropName="checked"
            style={{"marginTop": "0px", "marginBottom": "15px"}}
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
            <span style={{ float: "right"}}>
            <Button
                 type="primary"
                 key="depositbutton"
                 onClick={handleOk}
                 disabled={okDisabled}
                 loading={loading}
            >
            Deposit
            </Button>
            </span>  
          </Form.Item>

      </Form>
        </Modal>
       </span>
    );
};

export default Deposit;
