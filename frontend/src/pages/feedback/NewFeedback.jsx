import { useState } from "react"
import Button from "../../components/ui/Button"
import Container from "../../components/ui/Container"
import TextInput from "../../components/ui/TextInput"
import * as defaults from "../../data/Constants"
import Card from "./Card"
import { motion } from "framer-motion"

const NewFeedback = () => {
  // Stages #0 - How many questions
  // Stages #1 - What type of questions
  // Stages #2 - QR Codes
  const [stage, setStage] = useState(0)
  // Number of questions
  const [numQ, setNumQ] = useState(defaults.DEFAULT_QUESTIONS)

  const toggle = () => stage === 2 ? setStage(0) : setStage(stage + 1)

  return <>
    <Container>
      {stage === 0 && <FirstStage toggle={toggle} numQ={numQ} setNumQ={setNumQ} />}
      {stage === 1 && <SecondStage toggle={toggle} numQ={numQ} />}
      {stage === 2 && <ThirdStage toggle={toggle} />}
    </Container>
  </>
}

const FirstStage = ({ toggle, numQ, setNumQ }) => {
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
      <TextInput className={!valid ? "border-red-500 focus:outline-red-500" : ""} placeholder="Default: 3" onChange={handleType} />
      {!valid &&
        <small className="text-red-500">
          You must choose a number between {defaults.MINIMUM_QUESTIONS} and {defaults.MAXIMUM_QUESTIONS}
        </small>
      }
      </div>
      <motion.div
        whileHover={!valid && { scaleX: [1, 1.1, 1, 1.1, 1], scaleY: [1, 0.9, 1, 0.9, 1], transition: { type: "spring", repeat: Infinity, repeatType: "loop" } }}
      >
        <Button disabled={!valid} className={!valid ? "border-red-500 hover:outline-red-500 cursor-not-allowed opacity-75" : ""} text="Next" onClick={toggle} />
      </motion.div>
    </div>
  </>
}

const SecondStage = ({ toggle, numQ }) => {
  return <>
    <h1>
      We offer 3 different types of reflections, 
      that make the process of giving feedbacks 
      for your customers, easy and fast.
    </h1>
    {Array(numQ).fill(0).map((_, i) => <Card key={i} index={i} />)}
    <Button text="Next" onClick={toggle} />
  </>
}

const ThirdStage = ({ toggle }) => {
  return <>
    <h1>QR Codes??</h1>
    <Button text="Next" onClick={toggle} />
  </> 
}
 
export default NewFeedback;