import { handleUpload } from "./actions";
export default function DocForm({cartella = ""}) {
    return (
        <>
            <form action={handleUpload} className="h-2/3 flex flex-row items-end m-3 justify-evenly" >
            <div>
                <label htmlFor="documento">Documento</label>
                <input required className="border border-lime-600" type="file" name="documento" id="documento" />
            </div>
            {/*input "cartella" nascosto usato per passare alla server action la cartella in cui salvare il
            file*/}
            <input type="text" name="cartella" value={cartella} readOnly hidden/>
            <input type="submit" className="rounded bg-slate-200 px-5 hover:bg-slate-300 hover:text-slate-50" value="CARICA"/>
            </form>
        </>
    ) 
}