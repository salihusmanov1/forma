import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

function Tags({ tagList }) {
  const { control } = useFormContext();
  const { fields, replace } = useFieldArray({
    name: "tags",
    control,
  });

  const options = tagList?.data?.map((tag) => ({
    label: tag.name,
    value: tag.name.toLowerCase().replace(/\W/g, ""),
  }));

  const handleCreate = (input) => {
    const newTag = {
      label: input,
      value: input.toLowerCase().replace(/\W/g, ""),
      name: input,
    };

    replace([...fields, newTag]);
  };

  return (
    <CreatableSelect
      className="w-full"
      id="tags"
      isMulti
      value={fields.map((tag) => ({
        label: tag.name,
        value: tag.name.toLowerCase().replace(/\W/g, ""),
      }))}
      options={options}
      onCreateOption={handleCreate}
      theme={(theme) => ({
        ...theme,
        borderRadius: "6px",
        colors: {
          ...theme.colors,
          primary25: "#f4f4f5",
          primary: "black",
        },
      })}
      styles={{
        multiValue: (base) => ({
          ...base,
          borderRadius: "12px",
          backgroundColor: "#f4f4f5",
        }),
        multiValueRemove: (base) => ({
          ...base,
          "&:hover": {
            backgroundColor: "#f4f4f5",
          },
        }),
      }}
    />
  );
}

export default Tags;
