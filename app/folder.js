"use client"
import { saveAs } from "file-saver";
import { handleSelection } from "./actions";
import { useState } from "react";
export default function Folder({name}) {
    //funzione usata per controllare che il path in analisi conduca a un file per fare render differenti
    const isFile = () => {return name[name.length - 4] === "." || name[name.length - 5] === "."};
    if (isFile()) {
        //catena di split e pop per estrarre dalla stringa contenente il path, unicamente il file
        const extractedFile = name.split("\\").pop().split("/").pop();
        const handleSave = () => {
            /*
            built-in function del modulo npm file-saver per compatibilità con i browser
            IMPORTANTE: la funzione non funzionerà correttamente poiché si necesitterebbe di un disco
            fisso su un servizio cloud come AWS-S3
            saveAs("savedFiles/" + name, extractedFile);
            */
           alert("Attenzione, al momento non è possibile scaricare " + extractedFile);
        }
        return <button onClick={handleSave}>{name}</button>
    } else {
        const [classList, setClassList] = useState("");
        const handleSelec = () => {
            handleSelection(name);
            setClassList("text-blue-400");
            setTimeout(() => setClassList(""), 300);
        }
        return <button className={classList} onClick={handleSelec}>{name}</button>
    }
    }