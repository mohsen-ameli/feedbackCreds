import { useState } from "react"
import Button from "../../components/ui/Button"
import Container from "../../components/ui/Container"
import * as defaults from "../../data/Constants"
import FirstStage from "./firstStage/FirstStage"
import SecondStage from "./secondStage/SecondStage"
import ThirdStage from "./thirdStage/ThirdStage"

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
      {stage === 0 && <FirstStage toggle={toggle} setNumQ={setNumQ} />}
      {stage === 1 && <SecondStage toggle={toggle} numQ={numQ} />}
      {stage === 2 && <ThirdStage toggle={toggle} />}
    </Container>
  </>
}
 
export default NewFeedback;