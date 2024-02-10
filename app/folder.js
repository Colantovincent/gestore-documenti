"use client"
import { saveAs } from "file-saver";
export default function Folder({name, setFolder}) {
    //funzione usata per controllare che il path in analisi conduca a un file e reinderizzarlo diversamente
    const isFile = () => {return name[name.length - 4] === "." || name[name.length - 5] === "."};
    if (isFile()) {
        //ignorate la catena di split e pop, non avevo voglia di pensare
        const extractedFile = name.split("\\").pop().split("/").pop();
        const handleSave = () => {
            /*built-in function del modulo npm file-saver per compatibilità con i browser
            IMPORTANTE: la funzione non funzionerà correttamente poiché si necesitterebbe di un disco
            fisso su un servizio cloud come AWS-S3
            */
            saveAs("savedFiles/" + name, extractedFile);
        }
        return <input type="button" value={name} onClick={alert("Attenzione, al momento non è possibile scaricare file dal server")}/>
    } else {
        return <button onClick={setFolder("name")}></button>
    }
    }