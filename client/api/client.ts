import { initClient } from "@ts-rest/core";
import { contract } from "server/contracts/index";

let authToken = "";

if (typeof window !== 'undefined') {
  authToken = localStorage.getItem('authToken') || "";
}

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3001',
  baseHeaders: {
    "x-auth-token": authToken,
  },
});
