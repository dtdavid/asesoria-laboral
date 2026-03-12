import "dotenv/config"
import request from "supertest"
import app from "../src/app.js"
import { pool } from "../src/db.js"

// helper: hace login y devuelve token
async function loginAndGetToken(email, password) {
  const res = await request(app).post("/auth/login").send({ email, password })
  expect(res.status).toBe(200)
  expect(res.body.ok).toBe(true)
  expect(res.body.data?.token).toBeTruthy()
  return res.body.data.token
}

describe("Auth & Authorization", () => {
  test("POST /auth/login (GESTOR) devuelve token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "gestor@demo.test", password: "Cliente1234!" })

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.data?.token).toBeTruthy()
  })

  test("GET /empresas sin token -> 401", async () => {
    const res = await request(app).get("/empresas")
    expect(res.status).toBe(401)
    expect(res.body.ok).toBe(false)
  })

  test("GET /empresas con token CLIENTE -> 403", async () => {
    const tokenCliente = await loginAndGetToken("cliente1@demo.test", "Cliente1234!")

    const res = await request(app)
      .get("/empresas")
      .set("Authorization", `Bearer ${tokenCliente}`)

    expect(res.status).toBe(403)
    expect(res.body.ok).toBe(false)
  })

  test("GET /me/empresa con cliente asignado -> 200", async () => {
    const tokenCliente = await loginAndGetToken("cliente1@demo.test", "Cliente1234!")

    const res = await request(app)
      .get("/me/empresa")
      .set("Authorization", `Bearer ${tokenCliente}`)

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    // opcional: comprobar que viene una empresa
    expect(res.body.data).toBeTruthy()
  })
})

afterAll(async () => {
  await pool.end()
})
