import { useRef } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/TextInput";
import GetFeedbackItem from "../../../utils/GetFeedbackItem";
import SaveStorage from "../../../utils/SaveStorage";
import CardSpring from "./CardSpring";

const WrittenResponse = ({ back, deleteButton, index }) => {
  const input = useRef()
  const feedbackItem = GetFeedbackItem(index)

  // Handle submit
  const onSubmit = e => {
    e.preventDefault()

    // Saving the data to local storage
    const data = {
      "id": index,
      "type": "Written-response",
      "question": input.current.value,
    }
    SaveStorage(data)
    back()
  }

  return <>
    <CardSpring>
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        {/* Form */}
        <Input defaultValue={feedbackItem?.question} ref={input} placeholder="Question title" />

        {/* Buttons */}
        <div className="flex gap-x-2 mt-4">
          <Button text="Back" onClick={back} />
          <Button text="Delete" onClick={deleteButton} />
          <Button text="Save" type="submit" />
        </div>
      </form>
    </CardSpring>
  </>
}
 
export default WrittenResponse;