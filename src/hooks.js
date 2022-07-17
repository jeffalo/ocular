import { parse } from "$lib/cookies.js";
import jwt from "jsonwebtoken"
import { connectToDatabase } from '$lib/db';

import dotenv from 'dotenv';
dotenv.config();

export async function handle({ event, resolve }) {
  // do some stuff before

  // we have access to the cookie string, so lets find the ocular-token

  const token = parse(event.request.headers.get('cookie'), 'ocular-token');

  event.locals['session'] = {
    authenticated: false,
    token,
    user: null
  }

  // if we have a cookie, we can get the token from it

  if (token) {
    // we have a token, so lets get the user from the token

    // (tokens are actually jwts, so just verify the token and get the user)

    try {
      const jwtUser = await jwt.verify(token, process.env['JWT_SECRET']);

      // if we have a user, we can set the user on the request
      if (jwtUser) {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const user = await db.collection('users').findOne({
          'name': jwtUser.username
        });

        event.locals.session.authenticated = true;
        event.locals.session.user = user;
      } else {
        // console.log('fail #1')
        event.locals.session.authenticated = false;
        event.locals.session.user = {};
      }
    }
    catch (error) {
      console.error(error)
      // console.log('fail #2')
      event.locals.session.authenticated = false;
      event.locals.session.user = {};
    }
  }

  const response = await resolve(event);

  response.headers.set('x-made-with', '<3'); // :)

  // do some stuff after
  return response
}

export const getSession = async (event) => {
  return event.locals.session?.authenticated
    ? {
      authenticated: true,
      settings: {
        blocks: event.locals.session.user.settings?.blocks || '2.0',
        theme: event.locals.session.user.settings?.theme || 'system',
        showSignatures: event.locals.session.user.settings?.showSignatures || false
      },
      user: {
        username: event.locals.session.user.name,
      }
    }
    : {
      authenticated: false,
      settings: {
        // default settings
        blocks: "2.0",
        theme: 'system',
        showSignatures: false
      },
    };
};