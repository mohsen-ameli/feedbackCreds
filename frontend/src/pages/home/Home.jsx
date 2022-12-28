import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl px-8 mt-40 mx-auto flex flex-col items-center gap-y-6">
      <div className="w-full flex items-center gap-x-8">
        <PriceCard
          info={{
            price: "$0/mo",
            tier: "Free Tier",
            perks: ["3 Feedbacks", "60 QR-Codes (total)"],
          }}
        />
        <PriceCard
          info={{
            price: "$100/mo",
            tier: "Pro Tier",
            perks: ["200 Feedbacks", "Infinite (≈∞) QR-Codes/mo"],
          }}
          focused={true}
        />
        <PriceCard
          info={{
            price: "$10/mo",
            tier: "Mid Tier",
            perks: ["20 Feedbacks", "1000 QR-Codes/mo"],
          }}
        />
      </div>

      <Button
        onClick={() => navigate("/new-feedbacks")}
        text="Create a new feedback form!"
      />
    </div>
  )
}

const PriceCard = ({ info, focused }) => {
  return (
    <div
      className={
        "relative w-full h-full flex flex-col items-center gap-y-8 rounded-xl pt-28 " +
        (focused ? "px-8 pb-20 bg-slate-200" : "px-4 pb-16 bg-slate-100")
      }
    >
      <h1 className="absolute top-2 left-1/2 -translate-x-1/2 w-fit py-4 px-6 rounded-xl text-center text-4xl font-bold bg-blue-200 text-green-600">
        {info.price}
      </h1>

      <p className="text-2xl font-bold">{info.tier}</p>

      <ul className="w-full">
        {info.perks.map((perk) => (
          <li key={perk} className="">
            - {perk}
          </li>
        ))}
      </ul>

      <Button
        text="Select"
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  )
}

export default Home
