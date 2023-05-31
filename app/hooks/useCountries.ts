import countries from "world-countries";
import { Country, State, City, IState, ICity } from "country-state-city";

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
  isoCode?: string;
  name?: string;
  latitude?: string;
  longitude?: string;
};

export type CityType = {
  isoCode?: string;
  name?: string;
  latitude?: string;
  longitude?: string;
};

const useCountries: () => {
  getAll: () => { value: string; label: string; flag: string; latlng: number[]; region: string; }[];
  getByValue: (value: string | null) => { value: string; label: string; flag: string; latlng: number[]; region: string; } | undefined;
  getStatesByCountry: (countryCode?: string) => StateType[];
  getCitiesOfState: (country?: string, state?: string) => CityType[];
} = () => {
  const getAll = () => formattedCountries;
  const getAllStates = () => formattedStates;

  const getByValue = (value: string | null) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getStatesByCountry = (countryCode?: string) => {
    return State.getStatesOfCountry(countryCode) as StateType[];
  };

  const getCitiesOfState = (country?: string, state?: string) => {
    return City.getCitiesOfState(country as string, state as string) as CityType[];
  }

  return {
    getAll,
    getByValue,
    getStatesByCountry,
    getCitiesOfState
  };
};

export default useCountries;
