import { handleCreation } from "./actions";
export default function SidenavForm() {
  return (
    <form className="flex flex-colr-reverse align-bottom" action={handleCreation}>
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
  