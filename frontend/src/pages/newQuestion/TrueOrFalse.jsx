import { useContext, useRef } from "react"
import { Button, DangerButton } from "../../components/ui/Button"
import Input from "../../components/ui/TextInput"
import CardSpring from "./CardSpring"
import { StageContext } from "./NewQuestions"

const TrueOrFalse = ({ back }) => {
  const input = useRef()
  // Context
  const { update, delete_, question } = useContext(StageContext)

  // TODO: Add validation

  const onSubmit = async (e) => {
    e.preventDefault()

    // Update question
    const context = {
      title: input.current.value,
      question_type: "True-or-false",
    }
    update(question.id, context)

    // Go back
    back()
  }

  return (
    <>
      {/* Back button */}
      <span
        onClick={back}
        className="font-bold text-lg cursor-pointer p-4 absolute left-0 top-0"
      >
        &#x2190; Back
      </span>

      {/* Card info */}
      <CardSpring>
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          {/* Form */}
          <Input
            defaultValue={question.title}
            ref={input}
            placeholder="Question title"
          />

          {/* Buttons */}
          <div className="flex gap-x-2 mt-4">
            <DangerButton
              text="Delete"
              onClick={() => {
                back()
                delete_(question.id)
              }}
            />
            <Button text="Save" type="submit" />
          </div>
        </form>
      </CardSpring>
    </>
  )
}

export default TrueOrFalse
