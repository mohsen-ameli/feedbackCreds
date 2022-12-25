import { useContext, useRef, useState } from "react"
import { Button, DangerButton } from "../../components/ui/Button"
import Input from "../../components/ui/TextInput"
import CardSpring from "./CardSpring"
import { DEFAULT_NUM_OPTIONS } from "../../data/Constants"
import { StageContext } from "./NewQuestions"

const MultipleChoice = ({ back }) => {
  const input = useRef()
  const options = useRef()
  const [valid, setValid] = useState(true)
  // Context
  const { update, delete_, question } = useContext(StageContext)

  // TODO: Add validation

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

    // Update question
    const context = {
      "title": input.current.value,
      "question_type": "Multiple-choice",
      "choice_1": optionList[0],
      "choice_2": optionList[1],
      "choice_3": optionList[2],
      "choice_4": optionList[3],
    }
    update(question.id, context)
  
    // Go back
    back()
  }

  return <>
    {/* Back button */}
    <span onClick={back} className="font-bold text-lg cursor-pointer p-4 absolute left-0 top-0">
      &#x2190; Back
    </span>

    {/* Card info */}
    <CardSpring className="pt-14">
      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        {/* Question title */}
        <Input valid={valid} defaultValue={question.title} ref={input} placeholder="Question title" />
        
        {/* Options */}
        <div ref={options} className="grid grid-cols-4 gap-x-2 my-4">
          {Array(DEFAULT_NUM_OPTIONS).fill(0).map((_, i) => (
            <Input
              key={i}
              defaultValue={question[`choice_${i + 1}`]}
              placeholder={`#${i + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-x-2">
          <DangerButton text="Delete" onClick={() => {back(); delete_(question.id)}} />
          <Button text="Save" type="submit" />
        </div>
      </form>
    </CardSpring>
  </>
}

export default MultipleChoice