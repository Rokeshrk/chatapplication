// src/api/contracts.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const loginInput = z.object({ email: z.string(), password: z.string() });

export const loginContract = c.router({
  login: {
    method: 'POST',
    path: '/login',
    body: loginInput,
    responses: {
      404: z.string(),
      200: z.object({
        user: z.object({
          id: z.number(),
          username: z.string(),
          email: z.string(),
          password: z.string(),
        }),
        token: z.string(),
      }),
      500: z.string(),
    },
  },
});

const signupInput = z.object({ name: z.string(), email: z.string(), password: z.string() });

export const signupContract = c.router({
  signup: {
    method: 'POST',
    path: '/signup',
    body: signupInput,
    responses: {
      201: z.string(),
      200: z.object({
        newUser: z.object({
          id: z.number(),
          username: z.string(),
          email: z.string(),
          password: z.string(),
        }),
        token: z.string(),
      }),
      500: z.string(),
    },
  },
});
