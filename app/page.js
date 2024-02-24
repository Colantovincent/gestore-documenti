import DocForm from "./docform";
import SideNav from "./sidenav";
import SidenavForm from "./sidenavform";
export default function Home() {
  return (
    <div className="container mx-auto my-32 columns-2 flex flex-row h-96 w-5/6 rounded dark:bg-slate-800">
      <div className="basis-1/4 border-r flex flex-col items-end">
        <SideNav/>
        <hr className="my-3"/>
        <SidenavForm/>
      </div>
      <div className="basis-3/4 h-full">
        <DocForm/>
      </div>
    </div>
  );
}
