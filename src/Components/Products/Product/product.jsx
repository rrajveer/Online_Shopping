import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography,IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from '../styles'


const Product = ({product,onAddToCart}) => {
    const classes= useStyles();
    // console.log(product.media.source)
    return (
        <Card className={classes.root}>
            <CardMedia style={{height:"150px"}} className={classes.media} image={product.media.source} title={product.name} />
            <CardContent >
                <div className={classes.cardContent} style={{display:'flex', justifyContent:"space-between"}}>
                    <Typography variant='h5' gutterBottom component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant='h5'gutterBottom component="h2">
                        {product.price.formatted_with_symbol}
                    </Typography>
                   
                </div>
                <Typography dangerouslySetInnerHTML={{ __html:product.description}} variant='body2' color="textSecondary"/>
                
                </CardContent>  
                <CardActions disableSpacing className={classes.cardActions}>
                        <IconButton aria-label="add to cart" onClick={() =>onAddToCart(product.id,1)}>
                            <AddShoppingCart/>
                        </IconButton>
                </CardActions>
           
        </Card>
    )
}

export default Product
