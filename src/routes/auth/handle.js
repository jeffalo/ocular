import jwt from 'jsonwebtoken';
import { connectToDatabase } from '$lib/db';

import dotenv from 'dotenv';
dotenv.config();

export async function get(event) {
  const privateCode = event.url.searchParams.get('privateCode')

  let response = await fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`).then(r => r.json());

  if (response.valid) {
    // the private code is valid, so we sign the user in.

    // first we will check if the user already exists in the database.
    // this sign in process also works as a sign up process, as in no matter what you do, you will always end up signed in.


    const dbConnection = await connectToDatabase();
    const db = dbConnection.db;

    const user = await db.collection('users').findOne({
      'name': response.username
    });

    if (!user) {
      console.log('user does not exist, creating user (new signup!)');
      // the user doesnt exist in the database, so we create them
      let now = new Date()

      let userToInsert = {
        name: response.username,
        status: "",
        color: "",
        meta: {
          updated: now.toISOString(),
          updatedBy: "recent sign up"
        },
      }

      await db.collection('users').insertOne(userToInsert);
    }

    // generate a jwt

    const secret = process.env['JWT_SECRET']

    const token = jwt.sign({
      username: response.username,
    }, secret, { expiresIn: '60d' });

    // due to the jwt having its own expiration, we can just set the cookie never to expire

    const headers = {
      'Set-Cookie': `ocular-token=${token}; Path=/; Max-Age=31556952`,
      'Location': '/'
    }

    return {
      status: 302,
      headers
    }
  } else {
    // the private code is invalid, so we redirect to the login page with an error
    return {
      status: 302,
      headers: {
        'Location': '/login?error=failed_auth',
      }
    }
  }
}