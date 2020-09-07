import Axios from "axios";
import { config } from "dotenv";
config();
const api_key = process.env.API_KEY;

async function TestLogInRoute() {
  const res = await Axios.post(
    "http://localhost:8000/explorespace/api/login",
    {
      email: "admin@a.com",
      password: "123456",
    },
    {
      headers: {
        "api-key": api_key,
      },
    }
  );
  console.log(res.data);
}

TestLogInRoute();
