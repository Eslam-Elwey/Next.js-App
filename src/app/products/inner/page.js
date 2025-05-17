import Link from "next/link"

function page() {
    return (
        <div>
            <h1 className="text-center text-2xl text-white my-5">Hello From Inner Products</h1>
            <Link href="/products" className="underline text-cyan-300 text-center block ">All Products</Link>
        </div>
    )
}

export default page
