import dynamic from "next/dynamic";

const Landing = dynamic(()=>import('@/components/pages/Landing/index'),
    {loading : ()=><div className="h-screen w-screen flex items-center justify-center bg-blue-950 text-white">Loading...</div>})

export default function Home (){

    return (
        <>
        <Landing/>
        </>
    )
}