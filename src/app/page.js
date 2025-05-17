"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    import ('flowbite');
  },[])


  return (
    <div >
      <h1 className="text-center text-2xl text-white my-5">Hello From Home</h1>
    </div>
  );
}
