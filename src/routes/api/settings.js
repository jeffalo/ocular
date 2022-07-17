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

  /* adding a new setting:
  
    add it to the array below, with validation of the values
    (also make sure to put it in the object creation at the bottom)

    in src/hooks.js, add it to getSession following the same format as the others, and also add sane defaults for logged out users

    add a useful form option to src/routes/dashboard.svelte
  */


  // validate settings
  const validSettings = ['blocks', 'theme', 'showSignatures']

  if (Object.keys(body).some(s => !validSettings.includes(s))) {
    return {
      status: 400,
      body: {
        error: `valid settings are: ${validSettings.join(', ')}`
      }
    }
  }

  // individual settings validation
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

  if (typeof body.showSignatures !== 'boolean') {
    return {
      status: 400,
      body: {
        error: `showSignatures must be either true or false`
      }
    }
  }

  let settings = {
    blocks: body.blocks,
    theme: body.theme,
    showSignatures: body.showSignatures
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