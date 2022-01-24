import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment ,makeStyles,ButtonGroup,Button} 
from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder'
import ButtonC from '../controls/ButtonC';
import InputC from '../controls/InputC';
import SelectC from '../controls/SelectC';
import Form from '../layout/Form';
import {createAPIEndpoint,ENDPOINTS} from '../../api/config'
import{roundTo2DecimalPoint} from '../../utils/index'
const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'Cash', title: 'Cash' },
    { id: 'Card', title: 'Card' },
]


const useStyles = makeStyles(theme =>({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {
const {values,setValues, errors,setErrors, handleInputChange} = props;
const classes = useStyles();
const [customerList, setCustomerList] = useState([]);
useEffect(()=>{
    createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
    .then(res =>{
        let customerList = res.data.map(item=>({
            id:item.customerID,
            title:item.customerName
        }));
        customerList=[  {id:0, title:"select"}].concat(customerList);
        setCustomerList(customerList);
    })
    .catch(err => console.log(err))

},[])

//

useEffect(()=>{
let Gtotal = values.orderDetails.reduce((tempTotal, item)=>{
return tempTotal +(item.quantity * item.foodItemPrice);


},0);
setValues({
    ...values, 
    gTotal:roundTo2DecimalPoint(Gtotal)
})
},[JSON.stringify(values.orderDetails)])

const validateForm =()=>{
    let  temp ={};
    temp.customerID= values.customerID != 0? "": "this field is required.";
    temp.PaymentMethod= values.PaymentMethod != "none" ? "": "this field is required.";
    temp.orderDetails = values.orderDetails !=0 ? "" : "this field is required ";
    setErrors({...temp});
    return Object.values(temp).every(x => x=== "" );

}

const submitOrder = e=>{
e.preventDefault();
if(validateForm()){
    createAPIEndpoint(ENDPOINTS.ORDER).create(values)
    .then(res=>{
        console.log('response'+ res);
    })
    .catch(err =>console.log(err));

}

}
  return (



        <Form onSubmit={submitOrder}>
            <Grid container>
            <Grid item xs={6}>
            <InputC 
            label="Order Number"
            name="orderNumber"
            disabled
            value={values.OrderNumber}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={classes.adornmentText}>
                   #
                  </InputAdornment>
                ),
              }}
            />

            </Grid>
            <Grid item xs={6}>
            <SelectC
            label="Customer"
            name="customerID"
            error={errors.customerID}
            value={values.customerID}
            options ={customerList}
            onChange={handleInputChange}

            />

                </Grid>
           

            <Grid item xs={6}>
                 <InputC 
            label="Grand Total"
            name="Gtotal"
            disabled
            value={values.gTotal}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={classes.adornmentText} >
                   $
                  </InputAdornment>
                ),
              }}
            />
            </Grid>

            
            <Grid item xs={6}>
            <SelectC
              label="Payment Method"
              name="PaymentMethod"
              error={errors.PaymentMethod}
              value={values.PaymentMethod}
              onChange={handleInputChange}
              options={pMethods}
              
           

            />

<ButtonGroup className={classes.submitButtonGroup}>
                            <Button
                                size="large"
                                endIcon={<RestaurantMenuIcon />}
                                type="submit">Submit</Button>
                            <Button
                                size="small"
                                // onClick={resetForm}
                                startIcon={<ReplayIcon />}
                            />
                        </ButtonGroup>
                        <Button
                            size="large"
                            // onClick={openListOfOrders}
                            startIcon={<ReorderIcon />}
                        >Orders</Button>

                </Grid>
            </Grid>
           
        </Form>

  )
}
