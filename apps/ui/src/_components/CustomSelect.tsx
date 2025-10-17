"use client"

import Select from "react-select"

import type { MultiValue, SingleValue, StylesConfig } from "react-select"

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  name: string
  options: Option[]
  isMulti?: boolean
  className?: string
  inputId?: string
  placeholder?: string
  value: string[] | string
  onChange: (value: any) => void
  customStyles?: StylesConfig<Option, boolean>
  instanceId: string
}

const CustomSelect = ({
  customStyles,
  inputId,
  className,
  placeholder,
  name,
  options,
  isMulti = false,
  value,
  instanceId,
  onChange,
}: CustomSelectProps) => {
  const handleChange = (option: MultiValue<Option> | SingleValue<Option>) => {
    onChange(
      isMulti
        ? (option as MultiValue<Option>).map((item) => item.value)
        : (option as Option)?.value || ""
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((opt) => (value as string[]).includes(opt.value))
        : options.find((opt) => opt.value === value) || null
    }
    return isMulti ? [] : null
  }

  const defaultStyles: StylesConfig<Option, boolean> = {
    control: (base) => ({
      ...base,
      backgroundColor: "#F1F5FF",
      padding: "10px",
      border: "none",
      boxShadow: "none",
      minHeight: "auto",
      "&:hover": {
        border: "none",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0",
    }),
    input: (base) => ({
      ...base,
      margin: "0",
      padding: "0",
      color: "#979797",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#979797",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#979797",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E0E7FF",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#4B5563",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#F1F5FF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#E0E7FF" : "#F1F5FF",
      color: "#333",
      "&:active": {
        backgroundColor: "#C7D2FE",
      },
    }),
  }

  return (
    <Select
      inputId={inputId}
      className={className}
      name={name}
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      styles={customStyles || defaultStyles}
      instanceId={instanceId}
    />
  )
}

export default CustomSelect
