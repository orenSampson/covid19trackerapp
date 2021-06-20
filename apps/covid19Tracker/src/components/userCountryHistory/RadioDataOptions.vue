<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-radio
        v-model="dataOption"
        :val="DATA_MODE_OPTIONS[0]"
        :label="DATA_MODE_OPTIONS[0].toUpperCase()"
      />
      <q-radio
        v-model="dataOption"
        :val="DATA_MODE_OPTIONS[1]"
        :label="DATA_MODE_OPTIONS[1].toUpperCase()"
      />
    </div>

    <div class="q-px-sm">
      Your selection is: <strong>{{ dataOption }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { DATA_MODE_OPTIONS } from "src/constants/userCountryHistory";
export default {
  name: "RadioDataOptions",

  methods: {
    ...mapActions("userCountryHistory", ["setDataMode"]),
  },

  created() {
    this.DATA_MODE_OPTIONS = DATA_MODE_OPTIONS;
  },

  computed: {
    ...mapGetters("userCountryHistory", ["dataMode"]),
    dataOption: {
      get() {
        return this.dataMode;
      },
      set(newData) {
        this.setDataMode(newData);
      },
    },
  },
};
</script>

<style>
</style>