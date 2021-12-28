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
        control: (base, state) => ({
          ...base,
          height: 30,
          minHeight: 30,
          border: "2px solid #ced4d",
          transition:
            "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
          boxShadow: state.isFocused
            ? "0 0 0 0.25rem rgb(13 110 253 / 25%)"
            : 0,
          scrollbarWidth: "thin",
        }),
        valueContainer: (base) => ({
          ...base,
          height: 30,
          minHeight: 30,
          overflowY: "scroll",
          padding: "0 6px",
          scrollbarWidth: "thin",
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
        option: (base, state) => ({
          ...base,
          height: 30,
          minHeight: 30,
          fontSize: 12,
        }),
      }}
    />
  );
}
