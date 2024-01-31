import { mkdir } from "fs";
import { join } from "path";
export function SidenavForm() {
  async function handleCreation(data) {
    "use server"
    const cartella = data.get("folderName");
    const path = join(__dirname, "/savedFiles/", cartella);
    await mkdir(path, (err) => {err ? console.error("Errore: " + err) : console.log("Cartella creata")});
  }
    return (
      <form className="flex flex-colr-reverse align-bottom" action={handleCreation} method="get">
        <div>
          <label htmlFor="folderName">Nome Cartella</label>
          <input required className="bg-slate-50 rounded border-1 border-slate-300" id="folderName" name="folderName" type="text"/>
        </div>
        <div>
          <input type="submit" value="CREA" className="rounded bg-slate-200 px-5 hover:bg-slate-300 hover:text-slate-50"/>
        </div>
      </form>
    );
  }
  