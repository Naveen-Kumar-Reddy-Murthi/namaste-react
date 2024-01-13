import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../utils/restaurantsSlice";

const CitySelector = ({cities}) => {
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const dispatch = useDispatch();
  const CustomDropdownIndicator = () => null;

  const handleCityChange = (selectedOption) => {
    setSelectedCityOption(selectedOption);
    dispatch(setSelectedCity(selectedOption ? selectedOption.value : null));
  };

  return (
    
    <div>
      <Select
        id="city"
        value={selectedCityOption}
        onChange={handleCityChange}
        options={cities}
        isClearable
        placeholder="Select a city"
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
};

export default CitySelector;
