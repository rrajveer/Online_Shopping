import './App.css';
import React,{ useState, useEffect} from 'react'
import { NavBar, Products, Cart, Checkout} from './Components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  const[ products, setProducts ] = useState([]);
  const[cart,setCart] = useState({});
  const[order, setOrder] = useState({});
  const[errorMsg, setErrorMsg]= useState('');

  const fetchProducts = async() =>{
    const { data } = await commerce.products.list();
    setProducts(data)
  }
  const fetchCart = async() =>{
    // const { cart } = await commerce.cart.retrieve();
    // setCart(cart);
    setCart(await commerce.cart.retrieve())
  }
  const handleAddToCart = async(productId,quantity) =>{
    const item = await commerce.cart.add(productId,quantity)
    setCart(item.cart);
  }
  const handleCartUpdqty = async(productId,quantity)=>{
    const { cart } = await commerce.cart.update(productId,{ quantity})
    setCart(cart)
  }
  const handleRemoveFrmCart = async(productId)=>{
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }
  const handleEmptyCart = async()=>{
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }
  const refreshCart = async() =>{
    const newCart = await commerce.services.refresh()
    setCart(newCart)
  }
  const handleCaptureCheckout = async(checkoutTokenId, newOrder) =>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart();
    }
    catch(error){
         setErrorMsg(error.data.error.message)
    }
  }
  useEffect(() =>{
       fetchProducts();
       fetchCart();
  },[])

  // console.log(products);
  
  console.log(cart);
  return (
    <Router>
    <div>
      <NavBar totalItems={cart.total_items}/>
      <Switch>
        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart}/>
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} emptyCart={handleEmptyCart} updateCart={handleCartUpdqty} remCart={handleRemoveFrmCart}/>
        </Route>
        <Route exact path="/checkout">
           <Checkout 
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMsg}
            cart={cart}/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
