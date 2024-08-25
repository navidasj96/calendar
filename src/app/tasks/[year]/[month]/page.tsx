import dynamic from "next/dynamic";

const TasksDetail = dynamic(()=>import("@/components/pages/Tasks/index") , {
    loading: () => <div
        className="h-screen w-screen flex items-center justify-center bg-blue-950 text-white">Loading...</div>
})

const TaskPage = ({params}: { params: { year: string; month: string } }) => {


    return (

        <TasksDetail params={params} />

  )
}
export default  TaskPage