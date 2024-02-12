"use server"
import { join } from "path";
import { writeFile, mkdir, readdir } from "fs";
//variabile globale per mantenere il valore del path in cui salvare il file
let folder = "";
export async function handleSelection(folderName) {
    folder = folderName;
    return {success: true};
}
export async function handleUpload(data) {
    //un array per contenere i MIME types permessi (.txt, .pdf, .doc, .docx, .epub e .odt)
    const permittedTypes = ["text/plain", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/epub+zip", "application/vnd.oasis.opendocument.text"];
    let isPermitted = false;
    const file = data.get("documento");
    for (let type of permittedTypes) {
        if (type === file.type) {
            isPermitted = true;
            break;
        }
    }
    //Uscita precoce dalla funzione in caso il file non sia di tipo permesso
    if (!isPermitted) {
        console.error("Il client ha inviato un file di tipo non consentito");
        return {success: false, problem: "Il client ha inviato un file di tipo non consentito"};
    }
    //trasforma il file in buffer per mantenere la formattazione corretta all'upload
    const bits = await file.arrayBuffer();
    const buffer = Buffer.from(bits);
    const path = join("savedFiles/", folder, file.name);
    try {
        writeFile(path,
            buffer,
            { flag: "w+" },
            er => {
                er ? console.log("Errore: " + er) : console.log("Il file è stato caricato sul server");
            });
    } catch (err) {
        console.error("Errore: ", err);
        return{success: false, error: "Non è stato possibile caricare il file sul server"};
    }
    return {success: true};
}
export async function handleCreation(data) {
    const cartella = data.get("folderName");
    if (cartella === "") {
        console.error("Errore: il client ha inviato il form con cartella vuota");
        return;
    }
    const path = join("savedFiles/", cartella);
    mkdir(path, (err) => { err ? console.error("Errore: " + err) : console.log("Cartella creata")});
    return;
}
export async function getFolders() {
    let arr = [];
    //runna un fs.readdir ricorsivo e mette i nomi delle cartelle in un array da returnare al client
    readdir("savedFiles",
        {recursive: true},
        (err, files) => {
            if (err)
                console.error("Errore: " + err);
            files.forEach((el) => {
                arr.push(el);
            });
    });
    return {folderStructure: arr};
}