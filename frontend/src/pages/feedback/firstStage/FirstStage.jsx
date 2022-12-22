import { Button } from "../../../components/ui/Button"
import Card from "./Card"
import * as defaults from "../../../data/Constants"
import { createContext, useEffect, useState } from "react"
import useFetch from "../../../components/hooks/useFetch"
import axios from "axios"

export const StageContext = createContext()

/**
 * This is the first stage. The user can create questions here.
 */
const FirstStage = ({ toggle, numQuestions, setNumQuestions }) => {
  // State to see if the user can add more questions
  const [canAdd, setCanAdd] = useState(true)
  // Fetch commands
  const {data, loading, error, fetchData} = useFetch("http://localhost:8000/questions/")

  // Add new question
  const add = async () => {
    // Adding a new empty question
    await axios.post("http://localhost:8000/questions/", {})
    // Refreshing the data
    fetchData()
    // Adding one to the number of questions
    setNumQuestions(current => current + 1)
  }

  // Delete a question
  const delete_ = async (index) => {
    // Deleting the question
    await axios.delete(`http://localhost:8000/questions/${index}/`)
    // Refreshing the data
    fetchData()
    // Subtracting one from the number of questions
    setNumQuestions(current => current - 1)
  }

  // Updating a question
  const update = async (index, context) => {
    await axios.put(`http://localhost:8000/questions/${index}/`, context)
    // Refreshing the data
    fetchData()
  }

  // Checking if the user can add more questions
  useEffect(() => {
    numQuestions >= defaults.MAXIMUM_QUESTIONS ? setCanAdd(false) : setCanAdd(true)
  }, [numQuestions])

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{ error }</p>
  }

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

      {/* Questions */}
      {data.map((question, index) => (
        <StageContext.Provider value={{ add, delete_, update, question, index }} key={index}>
          <Card />
        </StageContext.Provider>
      ))}
      
      {/* Adding more questions */}
      <Button disabled={!canAdd} text="Add" onClick={add} />
      {!canAdd && <p className="mt-2 text-red-500">You can't add more than {defaults.MAXIMUM_QUESTIONS} questions.</p>}
    </div>
  </>
}

export default FirstStage