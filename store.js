import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userSignupReducer,
  userUpdateReducer,
  userGetProfileReducer,
  userSearchProfileReducer
} from './reducers/userReducers';
import {
  itemAddReducer,
  itemRequestReducer,
  itemUpdateReducer,
  itemListAddReducer
} from './reducers/itemReducer';


const initialState = {
  userSignin: { data: {}, loading: false, status: false, error: {} },
  userSignup: { data: {}, loading: false, status: false, error: {} },
  userProfile: { data: {}, loading: false, status: false, error: {} },
  userUpdate: { data: { data: [] }, loading: false, status: false, error: {} },
  userSearchProfile: { data: { data: [] }, loading: false, status: false, error: {} },
  item: { data: [], loading: false, status: false, error: {} },
  itemAdd: { data: { data: [] }, loading: false, status: false, error: {} },
  itemUpdate: { data: {}, loading: false, status: false, error: {} },
  itemList: { data: {}, loading: false, status: false, error: {} },
}

const reducer = combineReducers({
  userSearchProfile: userSearchProfileReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userProfile: userGetProfileReducer,
  posts: userSigninReducer,
  userUpdate: userUpdateReducer,
  item: itemRequestReducer,
  itemAdd: itemAddReducer,
  itemUpdate: itemUpdateReducer,
  itemList: itemListAddReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store