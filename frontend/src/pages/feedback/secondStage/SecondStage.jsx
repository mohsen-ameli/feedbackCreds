import Button from "../../../components/ui/Button"
import Card from "./Card"
import * as defaults from "../../../data/Constants"
import { useEffect, useState } from "react"

/**
 * This is the second stage of the feedback creation process.
 * Here we ask the user what type of questions they want to make.
 */
const SecondStage = ({ toggle, numQ, setNumQ }) => {
  // State to see if the user can add more questions
  const [valid, setValid] = useState(true)
  // TODO: Get the questions from the DB (local storage for now)
  const db = JSON.parse(localStorage.getItem("feedbacks"))
  const [questions, setQuestions] = useState(db ? [...db] : [{}])

  // Handle click on the add button
  const addQuestion = () => {
    // TODO: Add the new question to DB (local storage for now)
    setNumQ(current => current + 1)
    setQuestions(current => [...current, {}])
  }
  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify([...questions]))
  }, [questions])

  const deleteQuestion = (index) => {
    // TODO: Remove the question from DB (local storage for now)
    const feedbackItem = db[index]
    // let current = JSON.parse(localStorage.getItem("feedbacks"))
    // current.splice(feedbackItem.id, 1)
    // localStorage.setItem("feedbacks", JSON.stringify(current))
    // setQuestions(current)
  }

  // Check if the user can add more questions
  useEffect(() => {
    numQ >= defaults.MAXIMUM_QUESTIONS ? setValid(false) : setValid(true)
  }, [numQ])

  return <>
    <div className="flex flex-col items-center">
      <h1>
        We offer 3 different types of feedbacks, 
        that make the process of giving feedbacks 
        for your customers, easy and fast.
      </h1>
      <h1>
        You can make {defaults.MINIMUM_QUESTIONS}-{defaults.MAXIMUM_QUESTIONS} questions.
      </h1>
      <small>Notice: You cannot make more than 1 written response. This is so that customers don't get bored writing essays. or even worse be too lazy to even write anything. So try avoidcing written responses as much as possible</small>

      {questions.map((_, i) => <Card key={i} index={i} deleteQuestion={deleteQuestion} />)}
      
      {/* Adding more questions */}
      <Button disabled={!valid} text="Add" onClick={addQuestion} />
      {!valid && <p className="mt-2 text-red-500">You can't add more than {defaults.MAXIMUM_QUESTIONS} questions.</p>}
    </div>
  </>
}

export default SecondStage