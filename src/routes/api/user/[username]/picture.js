export async function get(request) {
  // hey if you're reading this, this endpoint is for ocular use only.
  // it hits the scratch api, so i rather this be only used by the ocular website.


  // get the username from the url
  const username = request.params.username;

  // get the userid from scratch
  const data = await fetch(`https://api.scratch.mit.edu/users/${username}`)
    .then(res => res.json())

  const userid = data.id || 1;

  // create the profile picture url
  const profilePictureUrl = `https://cdn.scratch.mit.edu/get_image/user/${userid}_128x128.png`;

  // return a redirect to the profile picture url

  // tell browsers to cache this for a year (usernames change very rarely)

  return {
    status: 302,
    headers: {
      Location: profilePictureUrl,
      'Cache-Control': 'max-age=31536000'
    }
  };
}