import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInStockBook, defaultValue } from 'app/shared/model/book/in-stock-book.model';

export const ACTION_TYPES = {
  FETCH_INSTOCKBOOK_LIST: 'inStockBook/FETCH_INSTOCKBOOK_LIST',
  FETCH_INSTOCKBOOK: 'inStockBook/FETCH_INSTOCKBOOK',
  CREATE_INSTOCKBOOK: 'inStockBook/CREATE_INSTOCKBOOK',
  UPDATE_INSTOCKBOOK: 'inStockBook/UPDATE_INSTOCKBOOK',
  DELETE_INSTOCKBOOK: 'inStockBook/DELETE_INSTOCKBOOK',
  RESET: 'inStockBook/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInStockBook>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type InStockBookState = Readonly<typeof initialState>;

// Reducer

export default (state: InStockBookState = initialState, action): InStockBookState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INSTOCKBOOK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INSTOCKBOOK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INSTOCKBOOK):
    case REQUEST(ACTION_TYPES.UPDATE_INSTOCKBOOK):
    case REQUEST(ACTION_TYPES.DELETE_INSTOCKBOOK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INSTOCKBOOK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INSTOCKBOOK):
    case FAILURE(ACTION_TYPES.CREATE_INSTOCKBOOK):
    case FAILURE(ACTION_TYPES.UPDATE_INSTOCKBOOK):
    case FAILURE(ACTION_TYPES.DELETE_INSTOCKBOOK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSTOCKBOOK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSTOCKBOOK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INSTOCKBOOK):
    case SUCCESS(ACTION_TYPES.UPDATE_INSTOCKBOOK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INSTOCKBOOK):
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

const apiUrl = 'services/book/api/in-stock-books';

// Actions

export const getEntities: ICrudGetAllAction<IInStockBook> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_INSTOCKBOOK_LIST,
    payload: axios.get<IInStockBook>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IInStockBook> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INSTOCKBOOK,
    payload: axios.get<IInStockBook>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInStockBook> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INSTOCKBOOK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInStockBook> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INSTOCKBOOK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInStockBook> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INSTOCKBOOK,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
