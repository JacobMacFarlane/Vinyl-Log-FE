'use server'
import { redirect } from "next/navigation"
import { fetchWithHeaders } from "./api-server"

export const signIn = async (email: any, password: any) => {
"use server"
const endpoint = 'https://young-atoll-04803-031f3915e15d.herokuapp.com/signin'
try {
    const response = await fetchWithHeaders(endpoint, "POST", email, password)
    console.log(response)
    const {success}: any = response
    if (success) {
        return {
            success: success
        }
    }
} catch (error: any) {
  
} finally {
 
}
}

export const logOut = async () => {
    "use server"
    const endpoint = 'https://young-atoll-04803-031f3915e15d.herokuapp.com/logout'
    try {
        const response = await fetchWithHeaders(endpoint, "POST")
        const {success, error}: any = response
        // const response = await fetch('https://young-atoll-04803-031f3915e15d.herokuapp.com/logout', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   // Include credentials if your server uses session-based authentication
        //   credentials: 'include',
        // });
        if (success) {
            return {
                success: "Success logging out"
            }
        }
        if (error) {
            return {
                error: "Error logging out"
            }
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
}