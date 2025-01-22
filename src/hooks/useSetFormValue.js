import { useFormContext } from "react-hook-form"


function useSetFormValue() {
  const { setValue } = useFormContext()

  const updateValue = (index, answer, question_id, type, option_index) => {
    type === 'checkbox'
      ? setValue(`answers.${index}.options.${option_index}`, answer)
      : setValue(`answers.${index}.answer`, answer);

    setValue(`answers.${index}.question_id`, question_id);
    setValue(`answers.${index}.type`, type);
  }
  return updateValue

}

export default useSetFormValue