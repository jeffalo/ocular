export async function get(event) {
  console.log(event.url.href.replaceAll('/discuss', ''))
  return {
    status: 302,
    headers: {
      location: event.url.href.replaceAll('/discuss', '')
    }
  }
}