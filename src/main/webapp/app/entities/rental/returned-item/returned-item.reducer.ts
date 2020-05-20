import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReturnedItem, defaultValue } from 'app/shared/model/rental/returned-item.model';

export const ACTION_TYPES = {
  FETCH_RETURNEDITEM_LIST: 'returnedItem/FETCH_RETURNEDITEM_LIST',
  FETCH_RETURNEDITEM: 'returnedItem/FETCH_RETURNEDITEM',
  CREATE_RETURNEDITEM: 'returnedItem/CREATE_RETURNEDITEM',
  UPDATE_RETURNEDITEM: 'returnedItem/UPDATE_RETURNEDITEM',
  DELETE_RETURNEDITEM: 'returnedItem/DELETE_RETURNEDITEM',
  RESET: 'returnedItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReturnedItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReturnedItemState = Readonly<typeof initialState>;

// Reducer

export default (state: ReturnedItemState = initialState, action): ReturnedItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RETURNEDITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RETURNEDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RETURNEDITEM):
    case REQUEST(ACTION_TYPES.UPDATE_RETURNEDITEM):
    case REQUEST(ACTION_TYPES.DELETE_RETURNEDITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RETURNEDITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RETURNEDITEM):
    case FAILURE(ACTION_TYPES.CREATE_RETURNEDITEM):
    case FAILURE(ACTION_TYPES.UPDATE_RETURNEDITEM):
    case FAILURE(ACTION_TYPES.DELETE_RETURNEDITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RETURNEDITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RETURNEDITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RETURNEDITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_RETURNEDITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RETURNEDITEM):
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

const apiUrl = 'services/rental/api/returned-items';

// Actions

export const getEntities: ICrudGetAllAction<IReturnedItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RETURNEDITEM_LIST,
    payload: axios.get<IReturnedItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReturnedItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RETURNEDITEM,
    payload: axios.get<IReturnedItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReturnedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RETURNEDITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReturnedItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RETURNEDITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReturnedItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RETURNEDITEM,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
