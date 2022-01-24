import React from 'react';
import OrderForm from './OrderForm';
import { useForm } from '../../hooks/useForm';
import { Grid } from '@material-ui/core';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItems from './OrderedFoodItems';
const generateOrderNumber = () =>Math.floor(100000 * Math.random() * 90000).toString();

const getFreshModel =()=>({
orderMasterID:0,
OrderNumber:generateOrderNumber(),
customerID:0,
PaymentMethod:'none',
gTotal:0,
deletedOrderItemsID:'',
orderDetails:[]


})
export default function Index() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls
}=useForm(getFreshModel);


  return(
    <Grid container spacing={2} >
      <Grid item xs={12}>
<OrderForm 

{...{values, setValues,errors,setErrors, handleInputChange}}
/>
</Grid>

  <Grid item xs={6}>
   <SearchFoodItems  {...{
   
   values, 
   setValues
  
  }}/>
  </Grid>


  <Grid item xs={6}>
<OrderedFoodItems {...{ values, setValues}}/>
  </Grid>

</Grid>

  )
}
