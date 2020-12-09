<template>
    <div>
        <star-toggle
            @click="starToggleClicked"
            :propsIsSelected="adminCountriesArr[this.propsIndex].isSelected"
            :propsCountryName="adminCountriesArr[this.propsIndex].country"
            :propsIsDisabled="disabled"
        />
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

import StarToggle from "components/general/StarToggle";
import { notifyError } from "src/utils/errorHandling";

export default {
    name: "AdminCountry",

    components: {
        StarToggle,
    },

    props: {
        propsIndex: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            disabled: false,
        };
    },

    computed: {
        ...mapGetters("adminCountries", ["adminCountriesArr"]),
    },

    methods: {
        ...mapActions("adminCountries", ["changeSelected"]),
        async starToggleClicked() {
            this.disabled = true;

            try {
                await this.changeSelected(this.propsIndex);
            } catch {
                notifyError();
            }

            this.disabled = false;
        },
    },
};
</script>