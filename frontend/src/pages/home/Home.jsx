import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import Container from "../../components/ui/Container";

const Home = () => {
  const navigate = useNavigate()

  return <>
    <Container>
      <div className="flex gap-6 justify-center">
        <Button onClick={() => navigate("/new-feedbacks")} text="Create a new feedback form!" />
        <Button onClick={() => console.log("take me to a new page")} text="Give a new feedback!" />
      </div>
    </Container>
  </>
}
 
export default Home;