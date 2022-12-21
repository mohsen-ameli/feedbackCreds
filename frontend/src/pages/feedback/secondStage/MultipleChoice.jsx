import { useRef, useState } from "react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/TextInput"
import GetFeedbackItem from "../../../utils/GetFeedbackItem"
import SaveStorage from "../../../utils/SaveStorage"
import CardSpring from "./CardSpring"
import { DEFAULT_NUM_OPTIONS } from "../../../data/Constants"

const MultipleChoice = ({ back, deleteButton, index }) => {
  const input = useRef()
  const options = useRef()
  const feedbackItem = GetFeedbackItem(index)

  const [valid, setValid] = useState(true)

  const onSubmit = e => {
    e.preventDefault()
    const optionList = []

    // Validating the options
    let optionsValid
    options.current.childNodes.forEach(child => child.value === "" ? optionsValid = false : (optionsValid = true, optionList.push(child.value)))

    // Validating the form
    if (input.current.value === "" || !optionsValid) {
      setValid(false)
      return
    } else {
      setValid(true)
    }

    // Saving the data to local storage
    const data = {
      "id": index,
      "type": "Multiple-choice",
      "question": input.current.value,
      "options": [...optionList]
    }
    SaveStorage(data)
    back()
  }

  return <>
    <CardSpring>
      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        {/* Question title */}
        <Input defaultValue={feedbackItem?.question} ref={input} placeholder="Question title" />
        {/* Options */}
        <div ref={options} className="grid grid-cols-4 gap-x-2 my-4">
          {Array(DEFAULT_NUM_OPTIONS).fill(0).map((_, i) => (
            <Input
              key={i}
              defaultValue={feedbackItem?.options && feedbackItem.options[i]}
              placeholder={`#${i + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-x-2">
          <Button text="Back" onClick={back} />
          <Button text="Delete" onClick={deleteButton} />
          <Button text="Save" type="submit" />
        </div>
      </form>
    </CardSpring>
  </>
}

export default MultipleChoice