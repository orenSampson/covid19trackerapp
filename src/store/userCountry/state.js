import {
  FROM_DEFAULT,
  TO_DEFAULT,
  COUNTRY_SLUG_DEFAULT,
  DATA_MODE_DEFAULT,
  FETCHED_DATA_DEFAULT
} from "src/constants/userCountry";

export default function() {
  return {
    from: FROM_DEFAULT,
    to: TO_DEFAULT,
    countrySlug: COUNTRY_SLUG_DEFAULT,
    dataMode: DATA_MODE_DEFAULT,
    fetchedData: FETCHED_DATA_DEFAULT
  };
}
