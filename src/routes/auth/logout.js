
export async function get(request) {
  // reset the cookie, and redirect to the home page

  return {
    status: 302,
    headers: {
      location: '/',
      'Set-Cookie': `ocular-token=; Path=/; Max-Age=31556952`,
    },
  }
}