import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const products = await axios
        .get("http://localhost:8080/api/product")
        .then((response) => response.data);

      commit("SET_PRODUCT", products);
    },

    async refill({ dispatch }, payload) {
      const refillProduct = await axios
        .put(
          `http://localhost:8080/api/product/${payload["id"]}/refill?amount=${payload["amount"]}`
        )
        .then((response) => response.data);
      dispatch("fetchProducts");
    },
    async buy({ dispatch }, payload) {
      const refillProduct = await axios
        .put(
          `http://localhost:8080/api/product/${payload["id"]}/buy?amount=${payload["amount"]}`
        )
        .then((response) => response.data);
      
        dispatch("fetchProducts");
    },
  },
});
