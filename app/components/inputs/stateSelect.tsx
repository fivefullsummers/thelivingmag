"use client";

import Select from "react-select";
import useCountries from "../../hooks/useCountries";
import { IState } from "country-state-city";

export type StateSelectValue = {
  value?: string;
  label?: string;
  latlng?: number[];
};

interface IStateSelectProps {
  countryCode: any;
  value: StateSelectValue;
  onChange: (value: StateSelectValue) => void;
}

const StateSelect: React.FC<IStateSelectProps> = ({
  countryCode,
  value,
  onChange,
}) => {
  const { getStatesByCountry } = useCountries();

  return (
    <div className="flex flex-col gap-8">
      <Select
        placeholder="State"
        isClearable
        defaultValue={getStatesByCountry("ZA")}
        options={getStatesByCountry(countryCode?.value)}
        value={value}
        onChange={(value) => onChange(value as StateSelectValue)}
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
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default StateSelect;
