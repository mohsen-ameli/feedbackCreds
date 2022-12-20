import Button from "../../../components/ui/Button"
import Card from "./Card"

/**
 * This is the second stage of the feedback creation process.
 * Here we ask the user what type of questions they want to make.
 */
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

export default SecondStage