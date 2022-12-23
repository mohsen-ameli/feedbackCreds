import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DangerButton } from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import TextInput from "../../../components/ui/TextInput";
import Counter from "../../../components/ui/Counter";
import axios from "axios";

const FeedbackCard = ({ index, feedback, reFetch }) => {
  // Navigation
  const navigate = useNavigate()
  const next = () => navigate(`/${feedback.id}/new-questions/`)
  // Changed name boolean (To show the save/cancel buttons)
  const [changed, setChanged] = useState(false)
  // The name of the feedback
  const [name, setName] = useState(feedback?.name)
  // Is the card open, used locally in this component
  const [isOpen, setIsOpen] = useState(false)
  // To keep track of the current name
  const currentName = useRef(feedback?.name)

  const save = async (e) => {
    e.preventDefault()
    setChanged(false)
    currentName.current = name

    // Saving the new name
    await axios.put(`http://localhost:8000/feedbacks/${feedback.id}`, { name })
  }

  const cancel = () => {
    console.log("current: ", currentName.current)
    setChanged(false)
    setName(currentName.current)
  }

  const handleChange = e => {
    if (!changed)
      setChanged(true)
    setName(e.target.value)
  }

  const animate = {
    height: isOpen ? 300 : 100
  }

  return <>
    <Card key={index} isOpen={isOpen} animate={animate}>
      <div className="w-full h-full flex items-center justify-around gap-x-2">
        {/* Counter */}
        <Counter index={index} />

        {/* Form */}
        <form onSubmit={save} className="w-full flex items-center gap-x-2 mx-8">
          {/* Feedback name */}
          <label>Name: </label>
          <TextInput
            placeholder="Name"
            className="ml-4 w-[12rem] md:w-auto"
            value={name}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex self-center gap-x-2 ml-auto">
            {changed && <>
              <Button text="Save" type="submit" />
              <DangerButton text="Cancel" onClick={cancel} />
            </>}
          </div>
          <Button text="Next" onClick={next} />
        </form>

        <Button className="px-2" text="QR-Code" onClick={() => setIsOpen(!isOpen)} />
      </div>
    </Card>
  </>;
}
 
export default FeedbackCard;