"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


function Page() {

    const {productId} = useParams();
    const pathName = usePathname() ;

    return (
        <div>
            <h1 className="text-center text-2xl text-white my-5">Hello Product Id :
                <span className="text-lime-400"> {productId}</span></h1>
                <Link href={`${pathName}/complain`} className="my-4 underline text-cyan-300 text-center block ">Product Compain</Link>

        </div>
    )
}

export default Page
