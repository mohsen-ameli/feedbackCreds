import party from "party-js"

// Play confetti animation on click
const playConfetti = (e) => {
  party.confetti(e.target, {
    count: 20,
  })
}

export default playConfetti
