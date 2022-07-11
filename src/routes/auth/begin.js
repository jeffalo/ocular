import dotenv from 'dotenv';
dotenv.config();

const redirectURL = process.env['REDIRECT_URL']
let redirectB64 = Buffer.from(redirectURL).toString('base64');
const authURL = `https://auth.itinerary.eu.org/auth/?redirect=${redirectB64}&name=ocular rewritten`

export async function get(request) {
  // redirect to the fluffy scratch login page
  return {
    headers: {
      location: authURL,
    },
    status: 302,
  }
}