import React from 'react'
import { Typography, Button, Card, CardActions, CardMedia, CardContent} from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({item, updateCart, remCart}) => {
    const classes = useStyles();
    return (
        <Card>
             <CardMedia image={item.media.source} alt="media-name" className={classes.media} />
             <CardContent className={classes.cardContent}>
                 <Typography variant="h6">{item.name}</Typography>
                 <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
             </CardContent>
             <CardActions className={classes.cardActions}>
                 <div className={classes.buttons}>
                 <Button type="button" size="small" onClick={()=>updateCart(item.id,item.quantity + 1)}>+</Button>
                 <Typography>{item.quantity}</Typography>
                 <Button type="button" size="small" onClick={()=>updateCart(item.id,item.quantity - 1)}>-</Button>
                </div>
                <Button type="button" variant="contained" color="primary" onClick={()=>remCart(item.id)}>Remove</Button>
             </CardActions>
            
        </Card>
    )
}

export default CartItem
