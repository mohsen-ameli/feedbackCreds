import { useRef } from "react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/TextInput"
import CardSpring from "./CardSpring"

const MultipleChoice = ({ back }) => {
  const form = useRef()
  // form.addEventListener("onSubmit", e => {
  //   console.log("submited")
  // })

  return <>
    <CardSpring>
      <form ref={form}>
        {/* Form */}
        <Input placeholder="Question title" />
        <div className="grid grid-cols-4 gap-x-2 my-4">
          <Input placeholder="#1" />
          <Input placeholder="#2" />
          <Input placeholder="#3" />
          <Input placeholder="#4" />
        </div>

        {/* Buttons */}
        <div className="flex gap-x-2">
          <Button text="Back" onClick={back} />
          <Button text="Save" onClick={back} />
        </div>
      </form>
    </CardSpring>
  </>
}

export default MultipleChoice