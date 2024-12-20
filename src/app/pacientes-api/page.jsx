import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import SubmitButton from "@/components/submit-button";



async function eliminarPaciente(formData) {
    'use server' //para que se ejecute en el servidor
    const id = formData.get("id")
    const consulta = `http://localhost:4000/pacientes/${id}`
   
    await fetch(consulta, { method: 'DELETE' })
   
    revalidatePath('/pacientes-api')
}


async function insertarPaciente(formData) {

    'use server' //siempre que sea un formulario
    const nombre = formData.get("nombre")
    const localidad = formData.get("localidad")
    const fecha_nacimiento = formData.get("fecha_nacimiento")
    
    await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre,localidad, fecha_nacimiento }),
    })
}



async function PaginaPacientes() {
    const response = await fetch('http://localhost:4000/pacientes' )
     
    const data = await response.json()
    return (

        <>
            {/* Formulario para insertar pacientes */}
            <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
                <form action={insertarPaciente} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" id="nombre"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="localidad" className="block text-sm font-medium text-gray-700">Localidad</label>
                        <input type="text" name="localidad" id="localidad"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                        <input type="date" name="fecha_nacimiento" id="fecha_nacimiento"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <SubmitButton 
                            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Insertar
                        </SubmitButton>
                    </div>
                </form>
            </div>


            {/* Lista de pacientes de api*/}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Alumnos de api:</h2>
                <div className="space-y-4">
                    {
                        data.map((paciente) => (
                            <div key={paciente.id} className="p-4 bg-white shadow-sm rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{paciente.nombre}</h3>
                                    <p className="text-sm text-gray-500">ID: {paciente.id}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/pacientes-api/${paciente.id}`} className="text-blue-500 hover:underline">Ver</Link>
                                    <Link href={`/pacientes-api/${paciente.id}/modificar`} className="text-yellow-500 hover:underline">Modificar</Link>
                                    <form action={eliminarPaciente}  className="inline">
                                        <input type="hidden" name="id" defaultValue={paciente.id} />
                                        <button  className="text-red-500 hover:underline">Eliminar</button>
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

export default PaginaPacientes