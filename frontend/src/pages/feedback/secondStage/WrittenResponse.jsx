import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/TextInput";
import CardSpring from "./CardSpring";

const WrittenResponse = ({ back }) => {
  return <>
    <CardSpring>
      {/* Form */}
      <Input placeholder="Question title" />

      <div className="flex gap-x-2 mt-4">
        <Button text="Back" onClick={back} />
        <Button text="Save" onClick={back} />
      </div>
    </CardSpring>
  </>
}
 
export default WrittenResponse;