

async function page() {

    const getData= async()=>{
        const data = await fetch('https://6821d512b342dce8004bfd39.mockapi.io/users',{cache:"force-cache"}) ;
        return data.json();
    }

    const users = await getData();


    return (
        <div>
            <h1 className="text-center text-2xl text-white my-5">SSG</h1>
            {users.map((user)=><h2 key={user.id} className="text-center text-lg text-lime-400 my-2">{user.name}</h2>)}
        </div>
    )
}

export default page
