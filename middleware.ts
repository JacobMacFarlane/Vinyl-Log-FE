import { NextRequest } from "next/server";
import { NextResponse } from 'next/server' 


export function middleware(request: NextRequest) {
    const { origin } = request.nextUrl
    const { pathname } = request.nextUrl
    const {cookies: requestCookies} = request
    const secretToken = requestCookies.get('jwt')?.value || ""
console.log(secretToken, 'yo')
const response = NextResponse.next();

    if (!secretToken) {
        clearCookiesAndRedirect(requestCookies, origin)
        return NextResponse.redirect(`${origin}`);
    }

    if (!secretToken ) { 
        const protectedPaths = ['/vinyls'] 
        for (const path of protectedPaths) { 
          if (request.url.includes(path)) {
             return NextResponse.redirect(`${origin}`) 
            } 
          } 
        } else if (secretToken) {
          if (request.url === origin) {
            return NextResponse.redirect(`${origin}/vinyls`)
          }
        }

        return response
}

function clearCookiesAndRedirect(requestCookies: any, origin: any) {
    requestCookies.getAll().forEach((item: any) => requestCookies.delete(item.name));
    // You can add more logic here if needed, like logging out the user from the backend
  }

export const config = {
    matcher: ['/vinyls']
}