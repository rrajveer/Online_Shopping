import React from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import { useState, useEffect } from 'react'
// import Confirmation from '../Confirmation'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import { commerce } from '../../../lib/commerce'
import { Link } from 'react-router-dom'

const Steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const classes = useStyles();

    const[shippingData,setShippingData]= useState({})
    const[activeStep,setActiveStep] = useState(0);
    const[checkoutToken, setCheckoutToken]=useState('')
    const[isfinished,setIsFinished] = useState(false)
    
     useEffect(() =>{

        const fetchToken = async() =>{
            try{
            const token = await commerce.checkout.generateToken(cart.id, {type:'cart'});
            console.log(token);
            setCheckoutToken(token)
            }catch(error){
                  console.log(error)
            }
        }
        fetchToken();

    },[cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep +1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep -1);

    const next=(data) =>{
        setShippingData(data);
        nextStep();
    }
    
    const timeOut = () =>{
        setTimeout(() =>{
             setIsFinished(true)
    },3000)
    }


    const Confirmation = () => order.customer ? (
        <>
           <Typography variant="h5">Thank you,firstname:{order.customer.firstname} lastname:{order.customer.lastname} </Typography>
           <Divider className={classes.divider}/>
           <Typography variant="subtitle2">Oreder ref: {order.customer_reference}</Typography>
           <br/>
           <Button component={Link} to="/" variant="outlined">Back to home</Button>
        </>
    )
    : isfinished ? (
        <>
           <Typography variant="h5">Thank you for your order</Typography>
           <Divider className={classes.divider}/>
           <br/>
           <Button component={Link} to="/" variant="outlined">Back to home</Button>
        </>
    )
    : <div className={classes.spinner}>
        <CircularProgress />
    </div>

    if(error){
        <>
           <Typography variant="h5">error:{error}</Typography>
           <br/>
           <Button compponent={Link} to="/" variant="outlined">Back to home</Button>
        </>
    }

    const Form= () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm 
             shippingData={shippingData} 
             checkoutToken={checkoutToken}  
             backStep={ backStep}
             onCaptureCheckout ={onCaptureCheckout}
             nextStep={nextStep}
             timeOut={timeOut}/>



    return (
    <>
        <div className={classes.toolbar}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {Steps.map((step) =>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === Steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
            
        </div>
    </>
    )
}

export default Checkout
