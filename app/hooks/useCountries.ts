import countries from "world-countries";
import { Country, State, City } from "country-state-city";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const formattedStates = State.getAllStates().map((state) => ({
  value: state.isoCode,
  label: state.name,
  latlng: [state.latitude, state.longitude].map((str) => parseFloat(str!)),
}));

export type StateType = {
  value?: string;
  label?: string;
  latlng?: number[];
};

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getAllStates = () => formattedStates;

  const getByValue = (value: string | null) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getStatesByCountry = (countryCode?: string) => {
    return State.getStatesOfCountry(countryCode) as StateType[];
  };

  return {
    getAll,
    getByValue,
    getStatesByCountry,
  };
};

export default useCountries;
