import { useFieldArray, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

function Tags() {
  const { control } = useFormContext();

  const tags = useFieldArray({
    name: "tags",
    control,
  });

  console.log(tags.fields);

  const handleChange = (arr) => {
    tags.replace(arr);
  };

  return (
    <CreatableSelect
      className="w-full"
      id="tags"
      isMulti
      value={tags.fields}
      onChange={(e) => handleChange(e)}
      options={tags.fields}
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
