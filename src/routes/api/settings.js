import { connectToDatabase } from '$lib/db';
import themes from "$lib/themes.js"

export async function put(event) {
  // check if authenticated
  if (!event.locals.session.authenticated) {
    return {
      status: 401,
      body: {
        error: 'unauthorized'
      }
    }
  }

  let requester = event.locals.session.user;

  const dbConnection = await connectToDatabase();
  const db = dbConnection.db;

  let body = await event.request.json()

  // validate settings
  const validSettings = ['blocks', 'theme']

  if (Object.keys(body).some(s => !validSettings.includes(s))) {
    return {
      status: 400,
      body: {
        error: `valid settings are: ${validSettings.join(', ')}`
      }
    }
  }

  const validBlockTypes = ['2.0', '3.0'];

  if (!validBlockTypes.includes(body.blocks)) {
    return {
      status: 400,
      body: {
        error: `blocks can only be ${validBlockTypes.join(', ')}`
      }
    }
  }

  const validThemes = themes;

  if (!validThemes.includes(body.theme)) {
    return {
      status: 400,
      body: {
        error: `theme can only be ${validBlockTypes.join(', ')}`
      }
    }
  }

  let settings = {
    blocks: body.blocks || event.locals.settings.blocks,
    theme: body.theme || event.locals.settings.theme
  }

  await db.collection('users').updateOne(
    { name: requester.name },
    { $set: { settings } }
  );

  return {
    status: 200,
    body: {
      settings
    }
  }
}