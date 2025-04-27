import axios from "axios"
export const getAllItems = () => async dispatch => {
    try {
      const res = await axios.get('/api/items');
      dispatch({ type: 'GET_ALL_ITEMS_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'GET_ALL_ITEMS_FAILED', payload: err });
    }
  };

  export const getItemById = (itemid) => async dispatch => {
    dispatch({type:'GET_ITEMBYID_REQUEST'})
    try {
      const res = await axios.post('/api/items', {itemid});
      dispatch({ type: 'GET_ITEMBYID_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'GET_ITEMBYID_FAILED', payload: err });
    }
  };

export const addItem=(item)=>async dispatch=>{
    dispatch({type:'ADD_ITEM_REQUEST'})

    try {
        const responce =await axios.post('http://localhost:3000/getitembyid', { item });

        console.log(responce);
        
        dispatch({type:'ADD_ITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'ADD_ITEM_FAILED' , payload : error})
        
    }
}