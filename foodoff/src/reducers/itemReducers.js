export const getAllItemsReducer=(state={items : []} , action)=>{


  switch(action.type)
  {
    case 'GET_ITEMS_REQUEST' : return{
       loading : true,
      ...state
    }
    case 'GET_ITEMS_SUCCESS' : return{
       loading : false ,
      items : action.payload
    }
    case 'GET_ITEMS_FAILED' : return{
        error : action.payload, 
        loading : false
    }
    default : return state
  }

}

export const getItemByIdReducer=(state={} , action)=>{


  switch(action.type)
  {
    case 'GET_ITEMBYID_REQUEST' : return{
       loading : true,
      ...state
    }
    case 'GET_ITEMBYID_SUCCESS' : return{
       loading : false ,
      item : action.payload
    }
    case 'GET_ITEMBYID_FAILED' : return{
        error : action.payload, 
        loading : false
    }
    default : return state
  }

}


const initialState = {
  items: [],
  loading: true,
  error: null,
};
export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ITEMS_SUCCESS':
      return { ...state, items: action.payload, loading: false };
    case 'GET_ALL_ITEMS_FAILED':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};