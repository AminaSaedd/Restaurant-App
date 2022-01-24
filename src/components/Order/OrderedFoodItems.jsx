import React from 'react';
import { IconButton, InputBase, List, ListItem, ListItemText, Paper,makeStyles, ListItemSecondaryAction, ButtonGroup, Button } from '@material-ui/core'
import { DeleteForeverTwoTone } from '@material-ui/icons';
import zIndex from '@material-ui/core/styles/zIndex';
import{roundTo2DecimalPoint} from '../../utils/index'




const useStyles = makeStyles(theme => ({
  paperRoot: {
      margin: '15px 0px',
      '&:hover': {
          cursor: 'pointer'
      },
      '&:hover $deleteButton': {
          display: 'block'
      }
  },
  buttonGroup: {
      backgroundColor: '#E3E3E3',
      borderRadius: 8,
      '& .MuiButtonBase-root ': {
          border: 'none',
          minWidth: '25px',
          padding: '1px'
      },
      '& button:nth-child(2)': {
          fontSize: '1.2em',
          color: '#000'
      }
  },
  deleteButton: {
      display: 'none',
      '& .MuiButtonBase-root': {
          color: '#E81719'
      },
  },
  totalPerItem: {
      fontWeight: 'bolder',
      fontSize: '1.2em',
      margin: '0px 10px'
  }
}))

export default function OrderedFoodItems(props) {
  const classes = useStyles();

  const {values, setValues}=props;
 let orderedFood=values.orderDetails;

//delete food item  by id 
const removeFoodItem =(index, id)=>{
  let r ={...values};
  r.orderDetails= r.orderDetails.filter((_, i)=> i !==index);
  setValues({...r});

}


  //update quantity 
  const updateQuantity=(index, value)=>{
    let x ={...values};
    let foodItem= x.orderDetails[index];

    if(foodItem.quantity + value>0){
    
    x.orderDetails[index].quantity +=value;
    setValues({...x});

  }
  }
  return (

<List>
{ orderedFood.length  ==0 ?
<ListItem>
 <ListItemText
 primary ="No Item is seleted!"
 primaryTypographyProps={{
   style:{
     textAlign:'center',
     fontStyle:"italic",
    
   }
 }}
 />
</ListItem>
: orderedFood.map((item, index)=>(
    <Paper 
    className={classes.paperRoot}
    key={index}>
      <ListItem >
        <ListItemText
        primary={item.foodItemName}
        primaryTypographyProps={{
          component: 'h1',
          style: {
              fontWeight: '500',
              fontSize: '1.2em',
             

          }}}

          secondary={
            <>
            <ButtonGroup className={classes.buttonGroup}>
              <Button onClick={e => updateQuantity(index, -1)}>-</Button>
              <Button disabled>{item.quantity}</Button>
              <Button onClick={e => updateQuantity(index, +1)}>+</Button>
            </ButtonGroup>
            <span className={classes.totalPerItem}>{'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)
              }

            </span>
            </>
          }

          secondaryTypographyProps={
            {
              component:'div'
            }
          }
        />

        <ListItemSecondaryAction>
        <IconButton  disableRipple color="secondary"
        className={classes.deleteButton}
         onClick={e => removeFoodItem(index, item.orderDetailID)}>
          <DeleteForeverTwoTone/>
        </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

    </Paper>
  ))
}
</List>
  )}
