import { APIService } from '../services/APIService';
const apiService = new APIService();


export const cart = {
  namespaced: true,
  state: {
    cart: null,
    cartItems: null,
    quantity: null
  },
  actions: {
    addToCart({ dispatch, commit }, { id, quantity }){

      apiService.addToCart({ id, quantity })
        .then(
          response => {
            dispatch('alert/success', "Urun Sepete Eklendi.", { root: true });
            dispatch('getCart');
          }
        )
    },
    getCart({ dispatch, commit }){
      apiService.getCart()
        .then(
          response => {
            commit('setCart', response.data);
            console.log(response.data);
          }
        );
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart;
      state.cartItems = cart.items;
      state.quantity = cart.quantity;
    },
  }
}
