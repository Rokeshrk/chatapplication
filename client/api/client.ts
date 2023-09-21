// api/client.ts

import { initClient } from "@ts-rest/core";
import {contract} from "server/contracts";

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3001',
  baseHeaders: {  },
});


  