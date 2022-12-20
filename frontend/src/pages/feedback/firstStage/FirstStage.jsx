import { useState } from "react"
import Button from "../../../components/ui/Button"
import TextInput from "../../../components/ui/TextInput"
import * as defaults from "../../../data/Constants"

/**
 * This is the first stage of the feedback creation process.
 * Here we ask the user how many questions they want to make.
 */
const FirstStage = ({ toggle, setNumQ }) => {
  const [valid, setValid] = useState(true)

  const handleType = (e) => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) return setValid(true)
    setNumQ(value)
    setValid(value >= defaults.MINIMUM_QUESTIONS && value <= defaults.MAXIMUM_QUESTIONS)
  }

  return <>
    <h1>
      First information we need is, how many questions 
      will your customers be answering? We strive to make
      feedbacks short and sweet.
    </h1>
    <h1>
      You can make {defaults.MINIMUM_QUESTIONS}-{defaults.MAXIMUM_QUESTIONS} questions.
    </h1>
    <small>Notice: You cannot make more than 1 written response. This is so that customers don't get bored writing essays. or even worse be too lazy to even write anything. So try avoidcing written responses as much as possible</small>

    <div className="flex flex-col items-start gap-y-6 mt-8">
      <div className="w-full">
        <TextInput valid={valid} placeholder="Default: 3" onChange={handleType} />
        {!valid &&
          <small className="text-red-500">
            You must choose a number between {defaults.MINIMUM_QUESTIONS} and {defaults.MAXIMUM_QUESTIONS}
          </small>
        }
      </div>
      <Button disabled={!valid} text="Next" onClick={toggle} />
    </div>
  </>
}

export default FirstStage