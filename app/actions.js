"use server"
import { join } from "path";
import { writeFile, mkdir, readdir } from "fs";
import { request } from "http";
export async function handleUpload(data) {
    //un array per contenere i MIME types permessi (.txt, .pdf, .doc, .docx, .epub e .odt)
    const permittedTypes = ["text/plain", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/epub+zip", "application/vnd.oasis.opendocument.text"];
    let isPermitted = false;
    const file = data.get("documento");
    const folder = data.get("cartella");
    for (let type of permittedTypes) {
        if (type === file.type) {
            isPermitted = true;
            break;
        }
    }
    //Uscita precoce dalla funzione in caso il file non sia di tipo permesso
    if (!isPermitted) {
        console.error("Il client ha inviato un file di tipo non consentito");
        return;
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
        return;
    }
    return;
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