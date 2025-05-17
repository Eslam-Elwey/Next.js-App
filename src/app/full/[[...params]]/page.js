"use client"
import { useParams } from "next/navigation"



function Params() {

    let {params} = useParams();
    params = JSON.stringify(params);
    console.log(params, typeof params);

    return (
        <div>
            <h1 className="text-center text-2xl text-white my-5">Hello Params</h1>
            <h1 className="text-center text-2xl text-white my-5">Received Params : <span className="text-2xl text-lime-400">{params}</span> </h1>
        </div>
    )
}

export default Params
