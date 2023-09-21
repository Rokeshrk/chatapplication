// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const loginInput = z.object({
  password: z.string(),
  email: z.string(),
});

export const loginContract = c.router({
  login: {
      method: "POST",
      path: "/login",
      body: loginInput,
      responses: {
          404: z.string(),
          200: z.object({
              user: z.object({
                  id: z.number(),
                  username: z.string(),
                  email: z.string(),
                  password: z.string(),
              }),token:z.string()
          }),
          500: z.string()
      }
  },
  getProfile:{
      method: 'GET',
      path: '/profile/:id',
      responses:{
          404:z.string(),
          200:z.object({
              username: z.string(),
              email: z.string(),
              profilePicture: z.string(),
              conversations:z.array(z.object({name:z.string(), id:z.number()})),
          })
      }
  }
})