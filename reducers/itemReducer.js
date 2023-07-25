import {
    ITEM_STATUS_REQUEST, ITEM_STATUS_SUCCESS,
    ITEM_STATUS_FAIL,
    ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS,
    ITEM_ADD_FAIL,ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,ITEM_UPDATE_FAIL,
    ITEMLIST_ADD_REQUEST, ITEMLIST_ADD_SUCCESS,
    ITEMLIST_ADD_FAIL,
} from "../constants/itemConstants";
  
  
  function itemRequestReducer(state = {}, action) {
  
    switch (action.type) {
      case ITEM_STATUS_REQUEST:
        return { ...state, loading: true, status: false };
      case ITEM_STATUS_SUCCESS:
          console.log('here')
        return { ...state, loading: false, data: action.payload, status: true };
      case ITEM_STATUS_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
      default: return state;
    }
  }
  
  
  function itemAddReducer(state = {}, action) {
    switch (action.type) {
      case ITEM_ADD_REQUEST:
        return { ...state, loading: true, status: false };
      case ITEM_ADD_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload, status: true };
      case ITEM_ADD_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
      default: return state;
    }
  }

  function itemUpdateReducer(state = {}, action) {
    switch (action.type) {
      case ITEM_UPDATE_REQUEST:
        return { ...state, loading: true, status: false };
      case ITEM_UPDATE_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload, status: true };
      case ITEM_UPDATE_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
      default: return state;
    }
  }

  function itemListAddReducer(state = {}, action) {
    switch (action.type) {
      case ITEMLIST_ADD_REQUEST:
        return { ...state, loading: true, status: false };
      case ITEMLIST_ADD_SUCCESS:
        return { ...state, loading: false, data: action.payload, status: true };
      case ITEMLIST_ADD_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
      default: return state;
    }
  }
  
  

  
  export {
    itemAddReducer,
    itemRequestReducer,
    itemUpdateReducer,
    itemListAddReducer,
  }