import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { Button } from "../../../components/ui/Button"
import Container from "../../../components/ui/Container"
import PageTitle from "../../../components/ui/PageTitle"
import TextInput from "../../../components/ui/TextInput"

const Login = () => {
  // Context
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Get the username and password
    const username = e.target.username.value
    const password = e.target.password.value

    if (username !== "" && password !== "")
      // Log the user in
      login(username, password)
  }

  return (
    <Container>
      <PageTitle text="Login" />

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
        <Button text="Login" type="submit" />
      </form>
    </Container>
  )
}

export default Login
