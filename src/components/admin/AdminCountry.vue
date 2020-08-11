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
        />
        <div>{{isSelected}}</div>
        <!-- <q-icon name="star" />
        <q-icon name="star_border" />-->
    </div>
</template>

<script>
export default {
    name: "AdminCountry",
    props: {
        propsIsSelected: {
            type: Boolean,
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
        propsCountryId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isSelected: false,
            iconVal: "star_border",
        };
    },
    mounted() {
        this.isSelected = this.propsIsSelected;
    },
    methods: {
        qchipSelected() {
            this.isSelected = !this.isSelected;
            if (this.isSelected) {
                this.iconVal = "star";
            } else {
                this.iconVal = "star_border";
            }
        },
    },
};
</script>