export async function get(event) {
  return {
    status: 302,
    headers: {
      location: `/user/${event.params.username}`
    }
  }
}