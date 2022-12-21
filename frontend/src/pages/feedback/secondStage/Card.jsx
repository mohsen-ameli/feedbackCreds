import { useState } from "react"
import MultipleChoice from "./MultipleChoice"
import TrueOrFalse from "./TrueOrFalse"
import WrittenResponse from "./WrittenResponse"
import { motion } from "framer-motion"
import GetFeedbackItem from "../../../utils/GetFeedbackItem"
import Button from "../../../components/ui/Button"

const Card = ({ index, deleteQuestion }) => {
  // Question type
  const [QType, setQType] = useState(null)
  // Is the card open?
  const [isOpen, setIsOpen] = useState(false)
  // The current feedback item
  const feedbackItem = GetFeedbackItem(index)

  // Back button
  const back = () => {
    setQType(null)
    setIsOpen(!isOpen)
  }

  // Handle click on each question type
  const handleClick = type => {
    setQType(type)
    setIsOpen(!isOpen)
  }

  return <>
    <motion.div
      className="my-4 mb-8 w-full flex justify-center
      items-center rounded-xl text-white shadow-2xl shadow-sky-900 bg-blue-400"
      animate={{ height: isOpen ? (QType === "Multiple-choice" ? 225 : 150) : 100 }}
      transition={{ duration: 0.25 }}
    >
      {/* Sub-sections */}
      {isOpen && QType === "Multiple-choice" && <MultipleChoice back={back} deleteButton={deleteQuestion} index={index} />}
      {isOpen && QType === "True-or-false" && <TrueOrFalse back={back} deleteButton={deleteQuestion} index={index} />}
      {isOpen && QType === "Written-response" && <WrittenResponse back={back} deleteButton={deleteQuestion} index={index} />}

      {/* Questions */}
      {!isOpen && QType === null && <>
        {/* Question counter */}
        <Counter index={index} />
        {feedbackItem?.id === index ?
          // ------- Feedback is saved -------
          <div className="w-full h-full flex items-center justify-between mx-4">
            {/* Question title */}
            <h1 className="text-lg">{ splitTitle(feedbackItem.type) } saved!</h1>
            {/* Change button */}
            <Button onClick={() => handleClick(feedbackItem.type)} text="Change"></Button>
          </div> :
          // ------- New feedback -------
          <>
            {/* Question type */}
            <Section title="Multiple Choice"  onClick={() => handleClick("Multiple-choice")} />
            <Section title="True or False"    onClick={() => handleClick("True-or-false")} />
            <Section title="Written Response" onClick={() => handleClick("Written-response")} />
          </>
        }
      </>}
    </motion.div>
  </>
}

const Counter = ({ index }) => {
  return <>
    <h1 className="ml-5 bg-orange-400 w-[25px] text-center rounded-full">
      { index + 1 }
    </h1>
  </>
}

const Section = ({ title, onClick }) => {
  return <>
    <div onClick={onClick} className="w-1/3 h-full flex flex-col items-center justify-center">
      <button className="p-5">
        <h1>{ title }</h1>
      </button>
    </div>
  </>
}

const splitTitle = (str) => {
  const words = str.split("-")
  return words.join(" ")
}

export default Card