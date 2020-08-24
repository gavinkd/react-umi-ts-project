/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Effect, Reducer, Subscription, Action } from 'umi';
import { getData, GetDataType } from '@/service/testService';
import { ResponseType, PayLoadType } from '@/types/type';
export interface GlobalState {
  isLogin: boolean;
  useList: GetDataType | null;
}

export interface GlobalModalType {
  namespace: 'global';
  state: GlobalState;
  effects: {
    getData: Effect;
  };
  reducers: {
    save: Reducer<GlobalState, PayLoadType<GlobalState>>;
    saveList?: Reducer<GlobalState>;
  };
  subscriptions?: Subscription;
}

const globalModel: GlobalModalType = {
  namespace: 'global',
  state: {
    isLogin: true,
    useList: null,
  },
  effects: {
    *getData({ payload }, { put, call }) {
      const response: ResponseType<GetDataType> = yield call(getData);
      // console.log(response);

      // if (response.code !== 200) {
      //   return false;
      // }

      yield put({
        type: 'save',
        payload: {
          useList: [response],
        },
      });

      return response;
    },
  },
  reducers: {
    save(state, actions) {
      return {
        ...state,
        ...actions.payload,
      };
    },
  },
};

export default globalModel;
