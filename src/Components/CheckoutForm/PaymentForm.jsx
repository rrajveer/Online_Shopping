import React from 'react'
import { Typography, Button, Divider} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './ReviewForm'

const  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken,backStep, shippingData, onCaptureCheckout, nextStep, timeOut}) => {
    const handleForm = async(event,elements,stripe) =>{
        event.preventDefault();

        if(!stripe && !elements) return
        const cardElement = elements.getElement(CardElement)

        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card: cardElement})
        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer:{ firstname: shippingData.firstname,lastname:shippingData.lastname,email:shippingData.email},
                shipping:{ name:'Primary', street:shippingData.address1,town_city:shippingData.city,county_state:shippingData.subdivision,postal_zip_code:shippingData.zip,country:shippingData.country},
                fulfilment:{shipping_method: shippingData.option},
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken,orderData);
            timeOut();
            nextStep();
        }
      


}
         
    
    
    return (
        <>
          <Review checkoutToken={checkoutToken} />
          <Divider />
          <Typography variant="h6" style={{margin:"20px 0px"}} gutterBottom>Payment Method</Typography>
          <Elements stripe={stripePromise}>
              <ElementsConsumer>
                  {({elements,stripe}) =>(
                    <form onSubmit={(event) => handleForm(event,elements,stripe)}>
                      <CardElement />
                      <br/> <br/>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                          <Button type="button" variant="outlined" onClick={backStep}>Back</Button>
                          <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                              Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                          </Button>
                    </div>
                      </form>
                  )}
              </ElementsConsumer>
          </Elements>
            
        </>
    )
}

export default PaymentForm
