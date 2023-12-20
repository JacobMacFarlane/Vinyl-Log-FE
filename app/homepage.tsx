"use client"

import { useEffect, useRef, useState } from "react"


export const HomePage = ({vinyls}: any) => {
    const [allVinyls, setAllVinyls] = useState([]);
    const [newVinyl, setNewVinyl] = useState({ album_name: '', artist_name: '', album_art_url: '' });
    const ref = useRef<HTMLFormElement>(null);
console.log(allVinyls, 'yo')
    const [randomVinyl, setRandomVinyl] = useState<any>(null);
  
    const handleChange = (e: any) => {
        setNewVinyl({ ...newVinyl, [e.target.name]: e.target.value });
      };

    useEffect(() => {
      setAllVinyls(vinyls);
    }, [vinyls]);

    const handleDelete = async (vinylId: any) => {
        console.log(vinylId)
        try {
          const response = await fetch(`https://young-atoll-04803-031f3915e15d.herokuapp.com/vinyls/${vinylId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          console.log('Vinyl deleted successfully');
          setAllVinyls(allVinyls.filter((vinyl: any) => vinyl.id !== vinylId));
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
  
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        ref.current?.reset()
        console.log(newVinyl, 'new vinyl')
        try {
          const response = await fetch('https://young-atoll-04803-031f3915e15d.herokuapp.com/vinyls', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
            body: JSON.stringify(newVinyl),
          });
          console.log(response)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data, 'data')
          setTimeout(() => {
            location.reload()
        }, 1000)
          // handle response data
        } catch (error) {
          // handle error
          console.error('There was a problem with the fetch operation:', error);
        }
      };
    const handleRandomVinyl = () => {
      const randomIndex = Math.floor(Math.random() * allVinyls.length);
      setRandomVinyl(allVinyls[randomIndex]);
    };
  
    return (
        <div className="w-full max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-500 mb-6">Vinyl Records</h1>
        <p className="text-lg text-gray-300">Discover the world of vinyl music</p>
      </header>

      {/* Random Vinyl Button */}
      <section className="mb-8 text-center">
        <button onClick={handleRandomVinyl} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out">
          Show Random Vinyl
        </button>
      </section>
        {randomVinyl && (
             <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
             <h2 className="text-2xl font-bold text-green-400 mb-2">{randomVinyl.album_name}</h2>
             <p className="text-gray-400 mb-4">Artist: {randomVinyl.artist_name}</p>
             {randomVinyl.album_art_url && <img src={randomVinyl.album_art_url} alt={randomVinyl.album_name} className="w-full h-auto rounded" />}
           </div>
        )}
      {/* Form Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-2 text-center border-t-2 border-green-500 pt-4">Add New Vinyl</h2>
        <form ref={ref} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="album_name" placeholder="Album Name" className="p-2 rounded border border-gray-300 text-gray-900" onChange={handleChange} />
          <input type="text" name="artist_name" placeholder="Artist Name" className="p-2 rounded border border-gray-300 text-gray-900" onChange={handleChange} />
          <input type="text" name="album_art_url" placeholder="Album Art URL" className="p-2 rounded border border-gray-300 text-gray-900" onChange={handleChange} />
          <button type="submit" className="bg-green-400 hover:bg-green-500 text-white font-bold text-xl py-2 px-4 rounded">Add Vinyl</button>
        </form>
      </section>

      {/* Vinyl Display Section */}
      <h2 className="text-2xl font-bold text-green-400 mb-2 text-center border-t-2 border-green-500 pt-4">Vinyl Collection</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allVinyls.map((vinyl: any, index: any) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-2">{vinyl.album_name}</h2>
            <p className="text-gray-400 mb-4">Artist: {vinyl.artist_name}</p>
            {vinyl.album_art_url && <img src={vinyl.album_art_url} alt={vinyl.album_name} className="w-full h-auto rounded" />}
            <button
        onClick={() => handleDelete(vinyl.id)}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete Vinyl
      </button>
          </div>
        ))}
      </section>
    </div>
  
    );
}