import { HomePage } from "./homepage";
import Login from "./login";

export default async function Home() {
// let theData

//   const response = await fetch('https://young-atoll-04803-031f3915e15d.herokuapp.com/vinyls', {
//     next: { revalidate: 0 },
//   })
//   .then(response => response.json())
//   .then(data => {
//     theData = data; // Log the data or use it in your frontend application
//   })
//   .catch(error => {
//     console.error('Error fetching data: ', error);
//   }); 
  
//   console.log(response, 'loo here')
  return (
<main className="flex min-h-screen flex-col bg-black text-white p-4 md:p-8">
      <Login />
    </main>
  )
}
