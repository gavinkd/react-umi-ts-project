/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Effect, Reducer, Subscription } from 'umi';

export interface GlobalState {
  isLogin: boolean;
}

export interface GlobalModalType {
  namespace: 'global';
  state: GlobalState;
  effects: {
    init: Effect;
  };
  reducers: {
    save: Reducer<GlobalState>;
  };
  subscriptions?: Subscription;
}

const globalModel: GlobalModalType = {
  namespace: 'global',
  state: {
    isLogin: true,
  },
  effects: {
    *init({ payload }, { put, call }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
  },
};

export default globalModel;
