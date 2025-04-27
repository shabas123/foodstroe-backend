import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk'; // `chunk` അല്ല, `thunk` ആയി മാറ്റുക
import { composeWithDevTools } from '@redux-devtools/extension';
import { itemReducer, getAllItemsReducer, getItemByIdReducer } from './reducers/itemReducers';
import { cartReducer } from './reducers/cartReducers';

const finalReducer = combineReducers({
    getAllItemsReducer: getAllItemsReducer,
    cartReducer: cartReducer,
    itemReducer: itemReducer,
    getItemByIdReducer : getItemByIdReducer
});

const cartItems = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []; 
const initialState = {
    cartReducer: {
        cartItems: cartItems
    }
};

const composeEnhancers = composeWithDevTools([]);

const store = createStore(
    finalReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
); 

export default store;