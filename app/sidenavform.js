"use client"
import { handleCreation } from "./actions";
import "feather-icons/dist/icons";
import { useState } from "react";
export default function SidenavForm() {
  const [showError, setShowError] = useState(null);
  const handleCreate = async (data) => {
    const {success} = await handleCreation(data);
    if (success) {
      alert("Cartella creata sul server");
      setShowError(<SuccessMSG/>);
      //effettua un refresh della pagina in maniera da resettare tutte le variabili e aggiornare il feed delle cartelle visibili
      setTimeout(() => window.location.reload(false), 1500);
    } else {
      setShowError(<ErrorMSG/>);
      setTimeout(() => setShowError(null), 1500)
    }
  }
  return (
    <>
    <form className="flex flex-col align-bottom columns-2" action={handleCreate}>
      <div className="mx-1">
        <label htmlFor="folderName" className="p-1">Nome Cartella</label>
      </div>
      <div className="mx-1">
        <input required className="bg-violet-50 border-1 border-slate-300 dark:bg-slate-600" id="folderName" name="folderName" type="text"/>
        <button type="submit" className="font-semibold dark:text-slate-50 bg-violet-300 dark:bg-violet-400 px-5 hover:bg-violet-400 hover:text-slate-50 dark:hover:bg-violet-300  active:bg-violet-500 dark:active:bg-violet-200">CREA</button>
      </div>
    </form>
    {showError}
    </>
  );
}
function ErrorMSG() {
  return (
    <>
      <div className="bg-red-500 w-60 rounded m-4">
        <p className="text-white mx-1">Non è stato possibile creare la cartella</p>
      </div>
    </>
  )
}
function SuccessMSG() {
  return (
    <>
      <div className="bg-green-500 w-60 rounded m-4">
        <p className="text-white mx-1">Cartella creata con successo</p>
      </div>
    </>
  )
}
  