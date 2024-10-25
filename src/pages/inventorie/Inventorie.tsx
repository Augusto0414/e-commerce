import { Plus } from "lucide-react";
import { Input } from "../../components";

const Inventorie = () => {
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white">
        <h1 className=" text-2xl mb-2 sm:mb-0 text-dark-blue">Inventario</h1>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Input type='search' placeholder='Buscar subcategoría...' />
          <button className="flex items-center bg-dark-blue px-4 py-3 text-white rounded-lg">
            <Plus className="mr-2" size={16} />
            Agregar
          </button>
        </div>
      </header>
    </>
  )
}

export default Inventorie;
