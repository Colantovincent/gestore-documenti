import { join } from "path";
import { writeFile } from "fs";
export function DocForm({folder = "/Prova/"}) {
    async function handleUpload(data) {
        "use server"
        const file = data.get("documento");
        const bits = await file.arrayBuffer();
        const buffer = Buffer.from(bits);
        const path = join(__dirname, "/savedFiles/", folder, file.name);
        try {
            await writeFile(path,
                buffer,
                {flag: "w+"},
                (er) => {
                er ? console.log("Errore: " + er) : console.log("Il file è stato caricato sul server")
            });
        } catch (err) {
            console.error("Errore: ", err);
            return {success: false};
        }
        return {success: true};
    };
    return (
        <>
            <form action={handleUpload} className="h-2/3 flex flex-row items-end m-3 justify-evenly" >
            <div>
                <label htmlFor="documento">Documento</label>
                <input required className="border border-lime-600" type="file" name="documento" id="documento" />
            </div>
            <input type="submit" className="rounded bg-slate-200 px-5 hover:bg-slate-300 hover:text-slate-50" value="CARICA"/>
            </form>
        </>
    ) 
}