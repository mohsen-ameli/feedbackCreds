import { useState } from "react"
import MultipleChoice from "./MultipleChoice"
import TrueOrFalse from "./TrueOrFalse"
import WrittenResponse from "./WrittenResponse"
import { motion } from "framer-motion"

const Card = ({ index }) => {
  // Question type
  const [QType, setQType] = useState(null)
  // Is the card open?
  const [isOpen, setIsOpen] = useState(false)

  // Back button
  const back = () => {
    setQType(null)
    setIsOpen(!isOpen)
  }

  // Handle click on each question type
  const handleClick = index => {
    setQType(index)
    setIsOpen(!isOpen)
  }

  return <>
    <motion.div
      className="my-4 mb-8 w-full flex justify-center
      items-center rounded-xl text-white shadow-2xl shadow-sky-900 bg-blue-400"
      animate={{ height: isOpen ? (QType === 0 ? 225 : 150) : 100 }}
      transition={{ duration: 0.25 }}
    >
      {/* Sub-sections */}
      {isOpen && QType === 0 && <MultipleChoice back={back} />}
      {isOpen && QType === 1 && <TrueOrFalse back={back} />}
      {isOpen && QType === 2 && <WrittenResponse back={back} />}

      {!isOpen && QType === null && <>
        {/* Question counter */}
        <h1 className="ml-5 bg-orange-400 w-[25px] text-center rounded-full">
          { index + 1 }
        </h1>

        {/* Question type */}
        <Section title="Multiple Choice"  onClick={() => handleClick(0)} />
        <Section title="True or False"    onClick={() => handleClick(1)} />
        <Section title="Written response" onClick={() => handleClick(2)} />
      </>}
    </motion.div>
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

export default Card