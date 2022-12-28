import Title from "../../components/ui/Title"
import {
  MAX_WRITTEN_RESPONSE_LENGTH,
  MIN_WRITTEN_RESPONSE_LENGTH,
} from "../../data/Constants"

const WrittenResponse = ({ question, setDataToSubmit }) => {
  // Saving the data to submit
  const onChange = (e) => {
    // TODO: Add a word counter, and validations on whther the user has entered enough words, and to save it or not

    const words = e.target.value
    const data = {}

    // If use has entered enough words
    if (
      words.length >= MIN_WRITTEN_RESPONSE_LENGTH &&
      words.length <= MAX_WRITTEN_RESPONSE_LENGTH
    ) {
      // Save the data
      data[question.id] = e.target.value
      setDataToSubmit((current) => ({ ...current, ...data }))
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-3 w-full">
      <Title title={question.title} />
      <h1>Max: {MAX_WRITTEN_RESPONSE_LENGTH} words</h1>
      <div className="w-full flex gap-x-4">
        <textarea
          onChange={onChange}
          maxLength={MAX_WRITTEN_RESPONSE_LENGTH}
          className="bg-slate-600 text-white p-2 w-full h-20 max-h-20 min-h-full rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>
    </div>
  )
}

export default WrittenResponse
