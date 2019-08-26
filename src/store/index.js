import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert';
import { authentication } from './authentication';
import { cart } from './cart';
import { order } from './order';
import { category } from './category';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    cart,
    order,
    category
  }
});
