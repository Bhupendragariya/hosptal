import React from 'react'

function Home() {


   const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log( "user login")
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"  value={e.value}/>
        <input type="text" />
        <input type="text" />
        <button type='sumbit'> sumbit</button>
      </form>
    </div>
  )
}

export default Home
