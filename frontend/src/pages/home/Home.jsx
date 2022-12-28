import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-6 justify-center">
      <p className="text-xl font-bold">
        $0/mo Free Tier: 2 feedbacks, 60 QR-Codes/mo
      </p>
      <p className="text-xl font-bold">
        $10/mo Mid Tier: 20 feedbacks, 5000 QR-Codes/mo
      </p>
      <p className="text-xl font-bold">
        $100/mo Pro Tier: 200 feedbacks, Infinite (≈∞) QR-Codes/mo
      </p>

      <Button
        onClick={() => navigate("/new-feedbacks")}
        text="Create a new feedback form!"
      />
    </div>
  )
}

export default Home
