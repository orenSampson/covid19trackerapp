<template>
  <div>
    <GmapMap
      id="map"
      :center="{ lat: 10, lng: 10 }"
      :zoom="3"
      :options="{ styles: stylesArray }"
      ref="mapRef"
    >
    </GmapMap>
  </div>
</template>

<script>
// import * as VueGoogleMaps from "vue2-google-maps";

import { gmapApi } from "vue2-google-maps";

export default {
  name: "VueGoogleMaps",

  computed: {
    google: gmapApi,
  },

  async mounted() {
    let countriesData;
    try {
      countriesData = await this.$axios.get("/api/user/get_map_info");
      countriesData = countriesData.data.data;
    } catch (error) {
      console.log("error :>> ", error);
      return;
    }

    for (const countryData of countriesData) {
      let googleCountryCoordsArr, coordinatesArr;
      let coordinate;

      if ("multi" in countryData) {
        const ccArray = [];

        for (const obj of countryData["xml"]["Polygon"]) {
          googleCountryCoordsArr = [];

          coordinatesArr =
            obj["outerBoundaryIs"]["LinearRing"]["coordinates"].split(" ");

          for (let oneCoordinate of coordinatesArr) {
            oneCoordinate = oneCoordinate.split(",");
            googleCountryCoordsArr.push(
              new this.google.maps.LatLng(oneCoordinate[1], oneCoordinate[0])
            );
          }

          ccArray.push(googleCountryCoordsArr);
        }

        this.createCountry(ccArray, countryData);
      } else {
        googleCountryCoordsArr = [];

        coordinatesArr =
          countryData["xml"]["outerBoundaryIs"]["LinearRing"][
            "coordinates"
          ].split(" ");

        for (let oneCoordinate of coordinatesArr) {
          oneCoordinate = oneCoordinate.split(",");

          googleCountryCoordsArr.push(
            new this.google.maps.LatLng(oneCoordinate[1], oneCoordinate[0])
          );
        }

        this.createCountry(googleCountryCoordsArr, countryData);
      }
    }

    this.addEventsToCountries();
  },

  methods: {
    createCountry(coords, country) {
      const currentCountry = new google.maps.Polygon({
        paths: coords,
        //strokeColor: 'white',
        title: country.country,
        code: country.iso,
        strokeOpacity: 0,
        //strokeWeight: 1,
        //fillColor: country['color'], // can be used as default color
        fillOpacity: 0,
      });

      this.countries.push(currentCountry);
    },

    async addEventsToCountries() {
      let map;
      try {
        map = await this.$refs.mapRef.$mapPromise;
      } catch (error) {
        console.log("error :>> ", error);
        return;
      }

      for (const country of this.countries) {
        country.setMap(map);

        this.google.maps.event.addListener(country, "mouseover", function () {
          country.setOptions({ fillColor: "#f5c879", fillOpacity: 0.5 });
        });

        this.google.maps.event.addListener(country, "mouseout", function () {
          country.setOptions({ fillColor: "#f5c879", fillOpacity: 0 });
        });

        this.google.maps.event.addListener(country, "click", function (event) {
          alert(country.title + " (" + country.code + ")");
        });
      }
    },
  },

  data() {
    return {
      countries: [],
      stylesArray: [
        {
          stylers: [{ hue: "#00ffe6" }, { saturation: -20 }],
        },
        {
          featureType: "landscape",
          stylers: [{ hue: "#ffff66" }, { saturation: 100 }],
        },
        {
          featureType: "road",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.locality",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.neighborhood",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative.province",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "landscape.man_made",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "landscape.natural",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
      ],
    };
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 760px;
  margin: 32px auto;
}
</style>
