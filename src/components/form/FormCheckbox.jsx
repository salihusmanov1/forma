import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

function FormCheckbox({ index, option_index, option, field, isDisabled }) {
  const { setValue, unregister } = useFormContext();

  const handleCheck = (e, index, id) => {
    e == true
      ? setValue(`${field.id}.${index}`, id)
      : unregister(`${field.id}.${index}`);
  };
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${index}_${option_index}`}
        onCheckedChange={(e) => handleCheck(e, option_index, option.id)}
        disabled={isDisabled}
      />
      <label
        id={`${index}_${option_index}`}
        className="text-sm font-medium leading-none focus:outline-none"
      >
        {option.name}
      </label>
    </div>
  );
}

export default FormCheckbox;
