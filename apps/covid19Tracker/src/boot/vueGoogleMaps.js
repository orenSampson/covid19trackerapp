// import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

import { API_KEY } from "src/constants/googleMaps";

export default function({ app, Vue, ssrContext }) {
  console.log("boot google map running");
  if (!process.env.SERVER) {
    Vue.use(VueGoogleMaps, {
      load: {
        key: API_KEY
        // libraries: "places" // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
        // region: 'VI',
        // language: 'vi',
      },

      //// If you intend to programmatically custom event listener code
      //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
      //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
      //// you might need to turn this on.
      // autobindAllEvents: false,

      //// If you want to manually install components, e.g.
      //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
      //// Vue.component('GmapMarker', GmapMarker)
      //// then set installComponents to 'false'.
      //// If you want to automatically install all the components this property must be set to 'true':
      installComponents: true
    });
  } else {
    Vue.component("GmapMap", { render: h => h("div") });
  }
}
