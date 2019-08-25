import { APIService } from '../services/APIService';
const apiService = new APIService();


export const order = {
  namespaced: true,
  state: {
    order: null,
    orderItems: null
  },
  actions: {

    getBills({ dispatch, commit }){
      apiService.getBills()
        .then(
          response => {
            commit("setOrder",response.data);
            console.log(response.data)
          }
        )
    }
  },
  mutations: {
    setOrder(state, order) {
      state.order = order;
    },
  }
}
