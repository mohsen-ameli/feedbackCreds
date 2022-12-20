import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/TextInput";
import CardSpring from "./CardSpring";

const TrueOrFalse = ({ back }) => {
  return <>
    <CardSpring>
      {/* Form */}
      <Input placeholder="Question title" />

      {/* Buttons */}
      <div className="flex gap-x-2 mt-4">
        <Button text="Back" onClick={back} />
        <Button text="Save" onClick={back} />
      </div>
    </CardSpring>
  </>
}
 
export default TrueOrFalse;