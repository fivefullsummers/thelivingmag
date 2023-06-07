import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Country, State, City, IState } from "country-state-city";
import useCountries, { CityType, StateType } from "../../hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  value: string;
  region: string;
};

export type StateSelectValue = {
  label: string;
  latlng: number[];
  value: string;
};

export type CountryData = {
  countryName?: string;
  stateName?: string;
  cityName?: string;
}

interface ICountryStateCityProps {
  onCityUpdate: (city: string) => void;
  onStateUpdate: (state: string) => void;
  onCountryUpdate: (country: CountrySelectValue) => void;
  onLatlngUpdate: (latlngVal: number[]) => void;
}

const CountryStateCity: React.FC<ICountryStateCityProps> = ({
  onLatlngUpdate,
  onCityUpdate,
  onStateUpdate,
  onCountryUpdate
}) => {
  const [countries, setCountries] = useState<
    {
      value: string;
      label: string;
      flag: string;
      latlng: number[];
      region: string;
    }[]
  >([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue>();
  const [selectedState, setSelectedState] = useState<StateType>();
  const [selectedCity, setSelectedCity] = useState<CityType>();

  const [latlngValue, setLatlngValue] = useState([0.0, 0.0]);

  const { getAll } = useCountries();
  const { getStatesByCountry } = useCountries();
  const { getCitiesOfState } = useCountries();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = getAll();
        setCountries(result);
        setSelectedCountry(undefined);
      } catch (error) {
        setCountries([]);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = getStatesByCountry(selectedCountry?.value);
        setCities([]);
        setSelectedCity(undefined);
        setStates(result);
        setSelectedState(undefined);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity(undefined);
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = getCitiesOfState(
          selectedCountry?.value,
          selectedState?.isoCode
        );
        setCities(result);
        setSelectedCity(undefined);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  useEffect(() => {
    const updateSelectedValues = () => {
      if (selectedCity) {
        onCityUpdate(selectedCity.name as string);
        setLatlngValue([parseFloat(selectedCity.latitude as string), parseFloat(selectedCity.longitude as string)]);
      } else if (selectedState) {
        onStateUpdate(selectedState.name as string);
        setLatlngValue([parseFloat(selectedState.latitude as string), parseFloat(selectedState.longitude as string)]);
      } else if (selectedCountry) {
        onCountryUpdate(selectedCountry);
        setLatlngValue(selectedCountry.latlng);
      }
      onLatlngUpdate(latlngValue);
    };
    updateSelectedValues();
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <>
      <Select
        menuPlacement="auto"
        placeholder="Country"
        isClearable
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) =>
          setSelectedCountry(selectedOption as CountrySelectValue)
        }
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
      <Select
        menuPlacement="auto"
        placeholder="State"
        isClearable
        options={states}
        value={selectedState}
        onChange={(selectedOption) => {
          console.log("selected option", selectedOption);
          setSelectedState(selectedOption as StateType);
        }}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.name}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          backgroundColor: "white",
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
      <Select
        menuPlacement="auto"
        placeholder="City"
        isClearable
        options={cities}
        value={selectedCity}
        onChange={(selectedOption) =>
          setSelectedCity(selectedOption as CityType)
        }
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.name}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          backgroundColor: "white",
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </>
  );
};

export default CountryStateCity;
