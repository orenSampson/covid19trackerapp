import Vue from "vue";
import Vuex from "vuex";

import oneCountry from "./oneCountry";
import userCountries from "./userCountries";
import adminCountries from "./adminCountries";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      oneCountry,
      userCountries,
      adminCountries
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
