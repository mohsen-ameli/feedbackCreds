import { useEffect, useState } from "react"
import useFetch from "../../components/hooks/useFetch"
import Container from "../../components/ui/Container"
import FirstStage from "./firstStage/FirstStage"
import ThirdStage from "./thirdStage/ThirdStage"

const NewFeedback = () => {
  // Stages #0 - How many questions
  // Stages #1 - What type of questions
  // Stages #2 - QR Codes
  const [stage, setStage] = useState(0)
  // Number of questions
  const [numQuestions, setNumQuestions] = useState()
  // Fetch commands
  const {data, loading, error} = useFetch("http://localhost:8000/num-questions/")

  // Toggling the stage
  const toggle = () => stage === 2 ? setStage(0) : setStage(stage + 1)

  // Handling the data
  useEffect(() => {
    data && setNumQuestions(data.number_of_questions)
  }, [data])

  // Loading and error handling
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  }

  return <>
    <Container>
      {stage === 0 && <FirstStage toggle={toggle} numQuestions={numQuestions} setNumQuestions={setNumQuestions} />}
      {stage === 2 && <ThirdStage toggle={toggle} />}
    </Container>
  </>
}
 
export default NewFeedback;