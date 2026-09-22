import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"
import { existsSync, readFileSync } from "fs"

// The tests call /api/testing/reset, which deletes ALL data, so they must
// only ever run against a separate test database (in .env.test locally, in
// GitHub Actions the workflow creates .env.test from repository secrets).
dotenv.config({ path: ".env.test" })

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Create .env.test with the URL of a test database.",
  )
}

if (existsSync(".env.local")) {
  const local = dotenv.parse(readFileSync(".env.local"))
  if (local.DATABASE_URL === process.env.DATABASE_URL) {
    throw new Error(
      "The test DATABASE_URL is the same as in .env.local. Refusing to run, " +
        "since the tests would delete all data. Use a separate test database.",
    )
  }
}

export default defineConfig({
  testDir: "./tests",
  // every test resets the shared database, so tests must run one at a time
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
