import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOverdueItem, defaultValue } from 'app/shared/model/rental/overdue-item.model';

export const ACTION_TYPES = {
  FETCH_OVERDUEITEM_LIST: 'overdueItem/FETCH_OVERDUEITEM_LIST',
  FETCH_OVERDUEITEM: 'overdueItem/FETCH_OVERDUEITEM',
  CREATE_OVERDUEITEM: 'overdueItem/CREATE_OVERDUEITEM',
  UPDATE_OVERDUEITEM: 'overdueItem/UPDATE_OVERDUEITEM',
  DELETE_OVERDUEITEM: 'overdueItem/DELETE_OVERDUEITEM',
  RESET: 'overdueItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOverdueItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OverdueItemState = Readonly<typeof initialState>;

// Reducer

export default (state: OverdueItemState = initialState, action): OverdueItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OVERDUEITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OVERDUEITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OVERDUEITEM):
    case REQUEST(ACTION_TYPES.UPDATE_OVERDUEITEM):
    case REQUEST(ACTION_TYPES.DELETE_OVERDUEITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OVERDUEITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OVERDUEITEM):
    case FAILURE(ACTION_TYPES.CREATE_OVERDUEITEM):
    case FAILURE(ACTION_TYPES.UPDATE_OVERDUEITEM):
    case FAILURE(ACTION_TYPES.DELETE_OVERDUEITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OVERDUEITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_OVERDUEITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OVERDUEITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_OVERDUEITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OVERDUEITEM):
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

const apiUrl = 'services/rental/api/overdue-items';

// Actions

export const getEntities: ICrudGetAllAction<IOverdueItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_OVERDUEITEM_LIST,
    payload: axios.get<IOverdueItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IOverdueItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OVERDUEITEM,
    payload: axios.get<IOverdueItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOverdueItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OVERDUEITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOverdueItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OVERDUEITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOverdueItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OVERDUEITEM,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
