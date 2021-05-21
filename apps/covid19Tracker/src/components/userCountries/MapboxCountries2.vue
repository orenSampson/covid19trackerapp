<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

import { MAPBOX_ACCESS_TOKEN } from "src/constants/mapbox";

export default {
  components: {
    MglMap,
  },
  data() {
    return {
      accessToken: MAPBOX_ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
};
</script>