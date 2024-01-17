import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../utils/restaurantsSlice";

const CitySelector = ({cities}) => {
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();

  const handleCityChange = (selectedOption) => {
    setSelectedCityOption(selectedOption);
    dispatch(setSelectedCity(selectedOption ? selectedOption.value : null));
  };

  useEffect(() => {
    // Show the warning for a brief period when no city is selected
    if (!selectedCityOption) {
      setShowWarning(false);
      const timeoutId = setTimeout(() => {
        setShowWarning(false);
      }, 5000); // Adjust the timeout duration as needed

      return () => clearTimeout(timeoutId);
    }
  }, [selectedCityOption]);

  return (
    
    <div>
      <Select
        id="city"
        value={selectedCityOption}
        onChange={handleCityChange}
        options={cities}
        isClearable
        placeholder="Select a city"
        components={{ DropdownIndicator: () => null }}
      />
      {showWarning && (
        <div className="bg-yellow-200 p-2 mt-2 fade-out-warning">
          Please select a city to continue.
        </div>
      )}
    </div>
  );
};

export default CitySelector;
