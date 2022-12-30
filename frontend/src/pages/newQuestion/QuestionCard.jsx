import { useContext, useState } from "react"
import MultipleChoice from "./MultipleChoice"
import TrueOrFalse from "./TrueOrFalse"
import WrittenResponse from "./WrittenResponse"
import { Button } from "../../components/ui/Button"
import Counter from "../../components/ui/Counter"
import { StageContext } from "./NewQuestions"
import Card from "../../components/ui/Card"
import { motion } from "framer-motion"

const QuestionCard = () => {
  // Question type, used locally in this component
  const [QuestionType, setQuestionType] = useState(null)
  // Is the card open, used locally in this component
  const [isOpen, setIsOpen] = useState(false)
  // Context
  const { question, index } = useContext(StageContext)

  // Handle click on each question type
  const handleClick = (type) => {
    setQuestionType(type)
    setIsOpen((current) => !current)
  }

  // Animate the card
  const animate = {
    height: isOpen ? (QuestionType === "Multiple-choice" ? 250 : 175) : 100,
  }

  return (
    <Card isOpen={isOpen} animate={animate} className="px-4">
      {/* Sub-sections */}
      {isOpen && QuestionType === "Multiple-choice" && (
        <MultipleChoice back={() => handleClick(null)} />
      )}
      {isOpen && QuestionType === "True-or-false" && (
        <TrueOrFalse back={() => handleClick(null)} />
      )}
      {isOpen && QuestionType === "Written-response" && (
        <WrittenResponse back={() => handleClick(null)} />
      )}

      {/* Main section */}
      {!isOpen && (
        <>
          {/* Question counter */}
          <Counter index={index} />

          {/* Questions */}
          {question.title !== "" ? (
            // Feedback is saved
            <SavedFeedback handleClick={handleClick} question={question} />
          ) : (
            // New feedback
            <Sections handleClick={handleClick} />
          )}
        </>
      )}

      <motion.div className="absolute bottom-1/2 translate-y-1/2 right-0 p-4 z-10 cursor-pointer">
        <i className="fa-solid fa-grip-vertical text-xl -z-10"></i>
      </motion.div>
    </Card>
  )
}

const Sections = ({ handleClick }) => {
  return (
    <>
      <div
        onClick={() => handleClick("Multiple-choice")}
        className="w-1/3 h-full text-lg flex flex-col items-center justify-center"
      >
        <button className="p-5">
          <h1>Multiple Choice</h1>
        </button>
      </div>
      <div
        onClick={() => handleClick("True-or-false")}
        className="w-1/3 h-full text-lg flex flex-col items-center justify-center"
      >
        <button className="p-5">
          <h1>True or False</h1>
        </button>
      </div>
      <div
        onClick={() => handleClick("Written-response")}
        className="w-1/3 h-full text-lg flex flex-col items-center justify-center"
      >
        <button className="p-5">
          <h1>Written Response</h1>
        </button>
      </div>
    </>
  )
}

const SavedFeedback = ({ question, handleClick }) => {
  return (
    <>
      <h1 className="text-lg">{splitTitle(question.question_type)} saved!</h1>
      <Button
        onClick={() => handleClick(question.question_type)}
        text="Change"
      />
    </>
  )
}

const splitTitle = (str) => {
  const words = str.split("-")
  return words.join(" ")
}

export default QuestionCard
