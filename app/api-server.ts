
import { cookies } from "next/headers";

export async function fetchWithHeaders(endpoint: any, method: any, email?: any, password?: any) {
  
    let headers = new Headers();
    let postBody;
    headers.set("Content-Type", "application/json");
    headers.set('cache', 'no-store')

    if (method === "POST" && endpoint === "https://young-atoll-04803-031f3915e15d.herokuapp.com/logout") {
        let response = await fetch(endpoint, {
            method: method,
            headers,
            credentials: 'include',
        })
        if (response.status === 200) {
            cookies().getAll().map((item) => cookies().delete(`${item.name}`))
            return {
                success: "Successfully logged out!"
            }
        } else {
            cookies().getAll().map((item) => cookies().delete(`${item.name}`))
            return {
                error: "There was a problem logging you out."
            } 
        }
       
    }
    if (method === "POST") {
        let response = await fetch(endpoint, {
            method: method,
            headers,
            body: JSON.stringify({ email, password }),
            cache: "no-store"
        })
        const data = await response.json();
        if (data) {
            cookies().set("jwt", data.user_info)
        }
        return ({
            success: "You have logged in"
        })
    }
}