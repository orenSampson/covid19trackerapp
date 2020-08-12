<template>
    <div>
        <q-chip
            @click="qchipSelected"
            class="glossy"
            color="orange"
            text-color="white"
            :icon="iconVal"
            :label="propsCountryName"
            clickable
            :disable="disabled"
        />
    </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

export default {
    name: "AdminCountry",
    props: {
        propsCountryId: {
            type: String,
            required: true,
        },
        propsCountryName: {
            type: String,
            required: true,
        },
        propsCountrySlug: {
            type: String,
            required: true,
        },
        propsIsSelected: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            disabled: false,
            isSelected: false,
            iconVal: "star_border",
        };
    },
    mounted() {
        this.isSelected = this.propsIsSelected;
        if (this.isSelected) {
            this.iconVal = "star";
        } else {
            this.iconVal = "star_border";
        }
    },
    methods: {
        async qchipSelected() {
            this.disabled = true;

            try {
                await axios.post(
                    "/admin/updateselected",
                    {
                        id: this.propsCountryId,
                        isSelectedNewVal: !this.isSelected,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("adminToken"),
                        },
                    }
                );
            } catch (err) {
                return Notify.create({
                    message: err.response.data.message,
                    color: "primary",
                });
            }

            this.isSelected = !this.isSelected;
            if (this.isSelected) {
                this.iconVal = "star";
            } else {
                this.iconVal = "star_border";
            }
            this.disabled = false;
        },
    },
};
</script>