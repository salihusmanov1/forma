import { useFieldArray, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

function Tags({ tagList }) {
  const { control } = useFormContext();
  const { fields, replace, remove, append } = useFieldArray({
    name: "tags",
    control,
  });

  const options = tagList?.data?.map((tag) => ({
    label: tag.name,
    value: tag.name,
    id: tag.id,
  }));

  const handleCreate = (input) => {
    const newTag = {
      label: input,
      value: input,
      name: input,
    };
    replace([...fields, newTag]);
  };

  const handleChange = (selectedOptions) => {
    if (!selectedOptions) {
      selectedOptions = [];
    }
    const updatedTags = selectedOptions.map((option) => ({
      name: option.label,
    }));
    remove();
    updatedTags.forEach((tag) => append(tag));
  };

  return (
    <CreatableSelect
      className="w-full"
      id="tags"
      isMulti
      value={fields.map((tag) => ({
        label: tag.name,
        value: tag.name,
        id: tag.id,
      }))}
      options={options}
      onCreateOption={handleCreate}
      onChange={handleChange}
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
