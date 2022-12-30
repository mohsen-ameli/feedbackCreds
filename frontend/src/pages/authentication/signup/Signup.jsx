import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { Button } from "../../../components/ui/Button"
import Container from "../../../components/ui/Container"
import PageTitle from "../../../components/ui/PageTitle"
import TextInput from "../../../components/ui/TextInput"

const Signup = () => {
  // Context
  const { signup } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Get the username and password
    const username = e.target.username.value
    const email = e.target.email.value
    const password = e.target.password.value

    if (username !== "" && email !== "" && password !== "")
      // sing the user up
      signup(username, email, password)
  }

  return (
    <Container>
      <PageTitle text="Sign up" />

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-y-8"
        autoComplete="on"
      >
        <label htmlFor="username">
          Username
          <TextInput
            name="username"
            id="username"
            placeholder="Username"
            className="mt-3"
          />
        </label>
        <label htmlFor="email">
          Email
          <TextInput
            name="email"
            id="email"
            placeholder="Email"
            className="mt-3"
          />
        </label>
        <label htmlFor="password">
          Password
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="mt-3"
          />
        </label>
        <Button text="Sign up" type="submit" />
      </form>
    </Container>
  )
}

export default Signup
