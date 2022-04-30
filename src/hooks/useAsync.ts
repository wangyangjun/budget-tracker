import { useReducer, useCallback } from 'react';

export enum LoadingState {
  IDLE,
  LOADING,
  DONE,
  ERROR
}

enum ActionType {
  BEGIN,
  COMPLETE,
  ERROR,
  RESET,
  RESET_ERROR
}

type Action = {
  type: ActionType;
  payload: any;
};

type State = {
  loadingState: LoadingState;
  isLoading: boolean;
  data: any;
  error: Error | null;
};

const defaultState: State = {
  loadingState: LoadingState.IDLE,
  isLoading: false,
  data: null,
  error: null
};

/**
 * @returns {typeof defaultState}
 */
function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.RESET:
      return defaultState;
    case ActionType.BEGIN:
      return {
        loadingState: LoadingState.LOADING,
        isLoading: true,
        data: action.payload.clearData ? null : state.data,
        error: action.payload.clearData ? null : state.error
      };

    case ActionType.COMPLETE: {
      const data =
        typeof action.payload === 'function' ? action.payload(state.data) : action.payload;

      return {
        loadingState: LoadingState.DONE,
        isLoading: false,
        data,
        error: null
      };
    }

    case ActionType.ERROR:
      return {
        loadingState: LoadingState.ERROR,
        isLoading: false,
        data: action.payload.keepOnError ? state.data : null,
        error: action.payload.err
      };
    case ActionType.RESET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

/**
 * Makes an asynchronous operation. Will handle all the state around the promise
 * regarding when it is loading, resolved or rejected.
 *
 * @returns {[ReturnType<typeof reducer>, (fn: () => Promise<any>, options?: { clearData: boolean, keepOnError: boolean }) => Promise<void>]}
 */
function useAsync() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const execute = useCallback(
    async (fn: () => Promise<any>, { clearData = false, keepOnError = false } = {}) => {
      dispatch({ type: ActionType.BEGIN, payload: { clearData } });

      try {
        dispatch({ type: ActionType.COMPLETE, payload: await fn() });
      } catch (err) {
        dispatch({ type: ActionType.ERROR, payload: { keepOnError, err } });
      }
    },
    []
  );

  const resetState = useCallback(
    () => dispatch({ type: ActionType.RESET, payload: {} }),
    [dispatch]
  );

  const resetErrorState = useCallback(
    () => dispatch({ type: ActionType.RESET_ERROR, payload: {} }),
    [dispatch]
  );

  return { state, execute, resetState, resetErrorState };
}

export default useAsync;
