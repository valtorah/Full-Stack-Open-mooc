import { registerUser } from "./actions"

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h2 className="mb-4 text-2xl font-semibold">Register</h2>
      <form action={registerUser}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </main>
  )
}
