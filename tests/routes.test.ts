import Axios from "axios";
import { api_key } from "../src/config/index.config";

async function Test() {
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

  console.log(res);
}

Test();
