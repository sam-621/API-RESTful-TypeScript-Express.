import Axios from "axios";
import { green, red, blackBright } from "cli-color";
import { config } from "dotenv";
config();
const api_key = process.env.API_KEY;

async function TestAuthRoutes() {
  const config = {
    headers: {
      "api-key": api_key,
    },
  };
  console.log(blackBright("Auth Routes test\n"));

  const test1 = await Axios.post(
    "http://localhost:8000/explorespace/api/login",
    {
      email: "admin@a.com",
      password: "123456",
    },
    config
  );

  const test2 = await Axios.post(
    "http://localhost:8000/explorespace/api/login",
    {
      email: "admin@.com",
      password: "1234",
    },
    config
  );

  console.log(blackBright("    POST"));

  if (test1.data.message === "SUCCESS") {
    console.log(green("\t✓") + " Should response a SUCCESS message");
  } else {
    console.log(red("\tX") + " Should response a SUCCESS message");
  }

  if (test2.data.message === "Wrong data schem") {
    console.log(green("\t✓") + " Should response a Wrong data schema message");
  } else {
    console.log(red("\tX") + " Should response a Wrong data schema message");
  }
  return;
}

TestAuthRoutes();

// restify listening at http://[::]:8080
//   products
//     GET
//       ✓ Should return json as default data format
//       ✓ Should return json as data format when set accept header to json
//     POST
//       ✓ Should return 201 status code and location header
