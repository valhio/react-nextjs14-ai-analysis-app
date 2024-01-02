import getSession from "@/actions/getSession";
import Dashboard from "./components/Dashboard";
import { redirect } from "next/navigation";

const Page = async () => {
    // const session = await getSession();    

    // if(!session?.user?.email){
    //     redirect("/sign-in");
    // }

    return (
        <Dashboard />
    )
};

export default Page;