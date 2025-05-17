"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


function page() {

    const [counter, setCounter] = useState(1) ;

    const incrementCount = ()=>{
        setCounter((val)=> val+1);
    }

    const pathName =usePathname();
    return (
        <div>
            <h1 className="text-center text-2xl text-white my-5">Hello From All Products</h1>
            <Link href={`${pathName}/inner`} className="my-4 underline text-cyan-300 text-center block ">Internal Product</Link>
            <Link href={`${pathName}/${counter}`} className="my-4 underline text-cyan-300 text-center block ">Go To Product {counter} </Link>
            <div className="w-1/5 mx-auto my-4">
                <button onClick={incrementCount} type="button" className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Incremnt</button>

            </div>
    
            
        </div>
    )
}

export default page
