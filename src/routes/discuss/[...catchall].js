export async function get(event) {
  console.log(event.params.catchall)
  return {
    status: 302,
    headers: {
      location: `/${event.params.catchall}`
    }
  }
}