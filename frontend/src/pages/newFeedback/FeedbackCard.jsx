import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DangerButton } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import TextInput from "../../components/ui/TextInput";
import Counter from "../../components/ui/Counter";
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

  // Saving the new name (PUT)
  const save = async (e) => {
    e.preventDefault()
    setChanged(false)
    currentName.current = name

    await axios.put(`/feedbacks/${feedback.id}`, { name })
  }

  // Canceling the name change
  const cancel = () => {
    setChanged(false)
    setName(currentName.current)
  }

  const handleChange = e => {
    if (!changed)
      setChanged(true)
    setName(e.target.value)
  }

  // Card open/close animation
  const animate = {
    height: isOpen ? 300 : 100
  }

  return <>
    <Card key={index} isOpen={isOpen} animate={animate}>
      <div className="w-full h-full flex items-center justify-around">
        {/* Counter */}
        <Counter index={index} />

        {/* Form */}
        <form onSubmit={save} className="w-full flex items-center gap-x-2 mx-8">
          {/* Feedback name */}
          <div className="flex flex-col items-start gap-y-1">
            {/* <label>Name*</label> */}
            <TextInput
              placeholder="Name"
              className="py-5 w-[10rem] md:w-auto"
              value={name}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex self-center gap-x-2 ml-auto">
            {changed ? <>
              <Button text="Save" type="submit" />
              <DangerButton text="Cancel" onClick={cancel} />
            </> : <Button text="Next" onClick={next} />}
          </div>
          <Button className="px-2" text="QR-Code" onClick={() => navigate(`/${feedback.id}/qr-code`)} />
        </form>
      </div>
    </Card>
  </>;
}
 
export default FeedbackCard;