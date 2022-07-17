import { connectToDatabase } from '$lib/db';

const getUser = async (username) => {
  return new Promise(async (resolve, reject) => {
    const dbConnection = await connectToDatabase();
    const db = dbConnection.db;

    // for legacy reasons, strip out asterisks from usernames
    const usernameStripped = username.replace(/\*/g, '');

    const user = await db.collection('users').findOne(
      {
        'name': usernameStripped
      },
      {
        collation: {
          locale: 'en',
          strength: 2
        }
      }
    )

    resolve(user);
  })
}

export async function get(request) {
  const { username } = request.params;

  let user = await getUser(username);

  if (!user) {
    return {
      status: 404,
      body: {
        error: 'user not found'
      }
    }
  }

  // todo: status replacements

  user['apiVersion'] = "ocular-rewritten"
  user['madeWith'] = "❤"

  return {
    status: 200,
    body: user
  };
}

export async function put(event) {
  const { username } = event.params;

  const user = await getUser(username);

  // first check if the user is authorized to update this user
  // users can only update themselves, but admins can update any user

  if (!event.locals.session.authenticated) {
    return {
      status: 401,
      body: {
        error: 'unauthorized'
      }
    }
  }

  let requester = event.locals.session.user;
  let canUpdate = false;

  if (requester.name == username) {
    canUpdate = true;
  } else if (requester.admin == true) {
    canUpdate = true;
  }

  if (!canUpdate) {
    return {
      status: 401,
      body: {
        error: 'unauthorized'
      }
    }
  }

  // ok we're good to go, update the user.

  const dbConnection = await connectToDatabase();
  const db = dbConnection.db;
  let now = new Date()

  // wait but admins can update any user, so we need to check if the user exists

  if (!user) {
    // if the user doesn't exist, create it!!

    let userToInsert = {
      name: username,
      status: event.body.status,
      color: event.body.color,
      meta: {
        updated: now.toISOString(),
        updatedBy: requester.name
      },
    }

    await db.collection('users').insertOne(userToInsert);
  } else {
    // otherwise just update the user

    // only update the following fields that are passed in
    // status, color

    let body = await event.request.json()

    await db.collection('users').updateOne({
      'name': username
    }, {
      $set: {
        'status': body.status,
        'color': body.color,
        'meta.updated': now.toISOString(),
        'meta.updatedBy': requester.name
      }
    });
  }

  return {
    status: 200,
    body: {
      message: 'user updated'
    }
  }
}