import { getFolders } from "./actions";
import Folder from "./folder";
export default async function SideNav() {
    //fetch e sort delle cartelle dello storage per poterle visualizzare
    let {folderStructure} = await getFolders();
    folderStructure.sort();
    return (
        <>
            <ul className="mx-3">
                {//Popolazione della lista
                folderStructure.map(el => {
                    return (<li key={el}><Folder name={el}/></li>)
                })}
            </ul>
        </>
    )
}