import React from 'react'
import { Button, Grid, Container, Typography} from '@material-ui/core'
import useStyles from'./styles'
import { LocalDiningTwoTone } from '@material-ui/icons';
import CartItem from './CartItem/CartItem'
import { Link} from 'react-router-dom'

const Cart = ({cart,emptyCart, updateCart, remCart}) => {
    const classes = useStyles();
    // const isEmpty= !cart.line_items.length;
    const EmptyCart = () =>(
             <Typography variant='h4'>Your cart is empty now, add some items to fill it
                   <Link to="/" className={classes.link}>Add Some Items...</Link>
             </Typography>
    )
    const FilledCart = () =>(
           <>
             <Grid container spacing={6}>
                 { cart.line_items.map((item) =>(
                     <Grid item key={item.id} xs={12} sm={4}>
                        <CartItem item={item} updateCart={updateCart} remCart={remCart}/>
                     </Grid>
                 ))}

             </Grid>
             <div className={classes.cardDetails}>
                 <Typography variant='h4'>SubTotal: {cart.subtotal.formatted_with_symbol}</Typography>
                 <div>
                     <Button className={classes.emptyButton} type="button" variant="contained" color="secondary" onClick={emptyCart}>Empty Cart</Button>
                     <Button component={Link} to="/checkout" className={classes.checkoutButton} type="button" variant="contained" color="primary">Check Out</Button>
                 </div>
             </div>
           </>
    )
   if(!cart.line_items) return 'Loading...';
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography  className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
            
        </Container>
    )
}

export default Cart
