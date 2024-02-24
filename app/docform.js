"use client"
import { useState } from "react";
import { handleUpload } from "./actions";
export default function DocForm({cartella = ""}) {
    const [fileInfos, setFileInfos] = useState({name: ""});
    return (
        <>
        <div className="py-3 px-12">
            <h1>{"Nome del file: " + fileInfos.name}</h1>
        </div>
        <hr className="mt-3"/>
            <form action={handleUpload} className="h-2/3 flex flex-row items-end m-3 justify-evenly" >
            <div className="border-2 rounded p-3 my-1/3 bg-slate-700">
                <input required type="file" name="documento" id="documento" onChange={e => setFileInfos(e.target.files[0])}/>
            </div>
            {/*input "cartella" nascosto usato per passare alla server action la cartella in cui salvare il
            file*/}
            <input type="text" name="cartella" value={cartella} readOnly hidden/>
            <input type="submit" className="font-semibold rounded p-3 dark:text-slate-50 bg-violet-300 dark:bg-violet-400 px-5 hover:bg-violet-400 hover:text-slate-50 dark:hover:bg-violet-300  active:bg-violet-500 dark:active:bg-violet-200" value="CARICA"/>
            </form>
        </>
    ) 
}