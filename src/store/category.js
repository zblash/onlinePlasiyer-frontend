import { APIService } from '../services/APIService';
const apiService = new APIService();


export const category = {
  namespaced: true,
  state: {
    categories: null
  },
  actions: {
    getAllCategories({ dispatch, commit }){

      apiService.getAllCategories()
        .then(
          response => {
            commit("setCategories",response.data);
          }
        )
    },
    deleteCategory({ dispatch, commit }, id){
      apiService.deleteCategory(id)
        .then(
          response => {
            dispatch("getAllCategories");
          }
        )
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
  }
}
