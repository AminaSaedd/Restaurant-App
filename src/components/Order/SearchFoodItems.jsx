import { IconButton, InputBase, List, ListItem, ListItemText, Paper,makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import { ArrowBackIosRounded, ArrowForward, ArrowLeftTwoTone, PlusOne, SearchTwoTone } from '@material-ui/icons';
import React,{useEffect,useState} from 'react';
import { createAPIEndpoint,ENDPOINTS} from '../../api/config';



const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
            
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))



export default function SearchFoodItems(props) {
    const classes = useStyles();
    const{values, setValues}=props;
    let orderedFood= values.orderDetails;
const[foodItems, setFoodItems] =useState([]);
const [searchList, setSearchList]=useState([]);
const[searchKey, setSearchKey]=useState('');
useEffect(()=>{
createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
.then(res =>{
setFoodItems(res.data);
setSearchList(res.data);

// console.log('Data is here',res.data);
})
.catch(err => console.log(err));
},[])

//filter search

useEffect(()=>{
    let search =[...foodItems];
    search= search.filter(y =>{
        return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase()) && orderedFood.every(item => item.foodItemID != y.foodItemID)
    });

    setSearchList(search);
    // console.log('FoodID',);

},[searchKey])



const addFoodItem = foodItem =>{
    let  add={
      orderMasterID:values.orderMasterID,
      orderDetailID:0,
      foodItemID:foodItem.foodItemID,
      quantity:1,
      foodItemPrice:foodItem.price,
      foodItemName:foodItem.foodItemName
  
  
    }
    setValues({
      ...values,
      orderDetails:[...values.orderDetails,add]
    })
  }
   


  return (
      <>
      <Paper className={classes.searchPaper}> 
<InputBase
 placeholder="Seach food items"
 className={classes.searchInput}
 value={searchKey}
 onChange={e=> setSearchKey(e.target.value)}
/>
<IconButton>
    <SearchTwoTone/>
</IconButton>
      </Paper>
      <List  className={classes.listRoot}>
          {searchList.map((item,index)=>(
                <ListItem key={index}
                onClick={e => addFoodItem(item)}>
                    <ListItemText primary={item.foodItemName}
                      secondary={'$'+item.price}/>
                          <ListItemSecondaryAction>
                              <IconButton onClick={e => addFoodItem(item)}>
                                
                              <PlusOne/>
                         <ArrowForward/>
                              </IconButton>
                          </ListItemSecondaryAction>

                   

                </ListItem>
          ))}
      </List>
      
      </>
  )
}
