import React from "react";
import "./MultiSelect.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options, onChange, value, name }) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      placeholder="Select Option"
      isMulti
      name={name}
      options={options}
      onChange={onChange}
      value={value}
      styles={{
        control: (base) => ({
          ...base,
          height: 30,
          minHeight: 30,
        }),
        valueContainer: (base) => ({
          ...base,
          height: 30,
          minHeight: 30,
          padding: "0 6px",
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: 30,
          minHeight: 30,
        }),
        input: (provided, state) => ({
          ...provided,
          margin: "0px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          height: 24,
          minHeight: 24,
          fontSize: 12,
          marginBottom: "1px",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#212529",
          opacity: 0.6,
        }),
        placeholder: (base) => ({
          ...base,
          fontFamily: "Roboto",
          fontSize: 13,
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.15,
          letterSpacing: "normal",
          textAlign: "left",
          color: "#8f9da9",
        }),
        multiValueRemove: (base) => ({
          ...base,
          height: 24,
          minHeight: 24,
          fontSize: 12,
        }),
        option: (base) => ({
          ...base,
          height: 30,
          minHeight: 30,
          fontSize: 12,
        }),
      }}
    />
  );
}
