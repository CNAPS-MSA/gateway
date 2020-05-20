import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRentedItem, defaultValue } from 'app/shared/model/rental/rented-item.model';

export const ACTION_TYPES = {
  FETCH_RENTEDITEM_LIST: 'rentedItem/FETCH_RENTEDITEM_LIST',
  FETCH_RENTEDITEM: 'rentedItem/FETCH_RENTEDITEM',
  CREATE_RENTEDITEM: 'rentedItem/CREATE_RENTEDITEM',
  UPDATE_RENTEDITEM: 'rentedItem/UPDATE_RENTEDITEM',
  DELETE_RENTEDITEM: 'rentedItem/DELETE_RENTEDITEM',
  RESET: 'rentedItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRentedItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RentedItemState = Readonly<typeof initialState>;

// Reducer

export default (state: RentedItemState = initialState, action): RentedItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RENTEDITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RENTEDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RENTEDITEM):
    case REQUEST(ACTION_TYPES.UPDATE_RENTEDITEM):
    case REQUEST(ACTION_TYPES.DELETE_RENTEDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RENTEDITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RENTEDITEM):
    case FAILURE(ACTION_TYPES.CREATE_RENTEDITEM):
    case FAILURE(ACTION_TYPES.UPDATE_RENTEDITEM):
    case FAILURE(ACTION_TYPES.DELETE_RENTEDITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RENTEDITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RENTEDITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RENTEDITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_RENTEDITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RENTEDITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/rental/api/rented-items';

// Actions

export const getEntities: ICrudGetAllAction<IRentedItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RENTEDITEM_LIST,
    payload: axios.get<IRentedItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRentedItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RENTEDITEM,
    payload: axios.get<IRentedItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRentedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RENTEDITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRentedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RENTEDITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRentedItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RENTEDITEM,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
