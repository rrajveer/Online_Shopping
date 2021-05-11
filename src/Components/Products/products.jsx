import React from 'react'
import { Grid }  from '@material-ui/core'
import Product from './Product/product'
import useStyles from './styles'
// const products=[
//     {id:1,name:"pro1",price:'50',description:"Running shoes",image:'https://source.unsplash.com/random/200x200'},
//     {id:2,name:"pro2",price:'40',description:"Apple Store",image:"https://source.unsplash.com/random/400x400"}

// ];
const Products = ({products,onAddToCart}) => {
    const classes = useStyles()

    if (!products.length) return <p>Loading...</p>;
   
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
        <Grid container justify="center" spacing={4}>
            {
              products.map((product) =>(
                  <Grid item key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                  </Grid>
              ))
            }
        </Grid>
        </main>
            
        
    )
}

export default Products
