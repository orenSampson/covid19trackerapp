<template>
  <div>
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="3"
      map-type-id="roadmap"
      style="width: 100%; height: 760px; margin: 32px auto"
    >
    </GmapMap>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";

export default {
  name: "VueGoogleMaps",
  mounted() {
    console.log("VueGoogleMaps :>> ", VueGoogleMaps);
  },
};
</script>

<style>
</style>
