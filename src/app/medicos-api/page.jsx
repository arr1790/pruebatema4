import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";
export const dynamic = 'force-dynamic'
import SubmitButton from "@/components/submit-button";


async function eliminarMedicos(formData) {
    'use server' //para que se ejecute en el servidor
    const id = formData.get("id")
 
    const consulta = `http://localhost:4000/medicos/${id}`
    
    await fetch(consulta, { method: 'DELETE' })
   
    revalidatePath('/medicos-api')
    
}


async function insertarMedico(formData) {

    'use server' //siempre que sea un formulario
    const nombre = formData.get("nombre")
    const especialidad = formData.get("especialidad")
    const perfil = formData.get("perfil")

    const response = await fetch('http://localhost:4000/medicos', {
        method: 'POST',
        body: JSON.stringify({ nombre, especialidad, perfil }),
    })

    const data = await response.json()

    revalidatePath('/medicos-api')
}




async function PaginaMedicos() {
    const response = await fetch('http://localhost:4000/medicos' )
     
    const data = await response.json()

 
    return (

        <>
            {/* Formulario para insertar medicos */}
            <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
                <form action={insertarMedico} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" id="nombre"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
                        <input type="text" name="especialidad" id="especialidad"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">Perfil</label>
                        <select name="perfil" id="perfil" defaultValue={'Residente'}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="Residente">Residente</option>
                            <option value="Especialista">Especialista</option>
                            
                        </select>
                    </div>
                    <div>
                        <SubmitButton
                            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Insertar
                        </SubmitButton>
                    </div>
                </form>
            </div>


            {/* Lista de medicos */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de api medicos</h2>
                <div className="space-y-4">
                    {
                        data.map((medico) => (
                            <div key={medico.id} className="p-4 bg-white shadow-sm rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{medico.nombre}</h3>
                                    <p className="text-sm text-gray-500">ID: {medico.id}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/medicos-api/${medico.id}`} className="text-blue-500 hover:underline">Ver</Link>
                                    <Link href={`/medicos-api/${medico.id}/modificar`} className="text-yellow-500 hover:underline">Modificar</Link>
                                    <form action={eliminarMedicos} className="inline">
                                        <input type="hidden" name="id" defaultValue={medico.id} />
                                        <button type="submit" className="text-red-500 hover:underline">Eliminar</button>
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default PaginaMedicos