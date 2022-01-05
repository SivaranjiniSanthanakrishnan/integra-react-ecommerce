import React, { useEffect, useState } from "react";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Card, CardActions, CardContent, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function ProductComponent(props) {
    const [productList, setProductList] = useState([]);

    useEffect(async () => {
        const token = localStorage.getItem('token');
        var decodedToken = jwt.decode(token);
    
        if (decodedToken.exp * 1000 <= Date.now()) {
            props.history.push('/')
        } else {
            var response = await axios.get('http://integra-node-ecommerce.herokuapp.com/product/get',
                {
                    headers: {
                        'access-token': token
                    }
                })
            console.log(response.data)
            setProductList(response.data);
        }
    }, [])

    const updateProduct = async (id, value) => {
        const token = localStorage.getItem('token');
        var decodedToken = jwt.decode(token);
    
        if (decodedToken.exp * 1000 <= Date.now()) {
            props.history.push('/');
        } else {
        
            var response = await axios.patch(`http://integra-node-ecommerce.herokuapp.com/product/update/${id}`, 
            {
                userQuantity: value
            },
            {
                headers: {
                    'access-token': token
                }
            })
            var productListCopy = [...productList];
            var index = productListCopy.findIndex(row => row._id === response.data._id);
            productListCopy[index] = response.data;
            setProductList(productListCopy);
        }
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Guvi - Products
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{ padding: '30px' }}>
                <Grid container spacing={4}>
                    {productList.map(row => (
                        <Grid item key={row._id}>
                            <Card sx={{ width: 250 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                        {row.productName}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Price: Rs.{row.price}
                                    </Typography>
                                    <Typography >
                                        Quantity: {row.quantity}
                                    </Typography> <br/>
                                    <Typography variant="body2">
                                        Description: {row.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="text" onClick={()=> updateProduct(row._id, ++row.userQuantity)} disabled={row.userQuantity >= row.quantity}>+</Button> 
                                    {row.userQuantity}
                                    <Button variant="text" onClick={()=> updateProduct(row._id, --row.userQuantity)} disabled={row.userQuantity <= 0}>-</Button> 
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default ProductComponent;