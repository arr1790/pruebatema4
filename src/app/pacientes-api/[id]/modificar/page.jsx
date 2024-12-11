import connection from "@/lib/mysql";
import { redirect } from "next/navigation";
import Header from "@/components/header";

async function modificarPaciente(formData) {
    'use server'
    const id = formData.get("id")
    const nombre = formData.get("nombre")
    const localidad = formData.get("localidad")
    const fecha_nacimiento = formData.get("fecha_nacimiento")
    await fetch('http://localhost:4000/pacientes/' + id, {
        method: 'PUT',
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento }),
    })
    redirect(`/pacientes-api/${id}`)
}


async function PageModificar({ params }) {
    const { id } = await params
    const response = await fetch(`http://localhost:4000/pacientes/${id}`)
    const paciente = await response.json()




    return (
            
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
          
            <form action={modificarPaciente} className="space-y-4">
                <input type="hidden" name="id" defaultValue={paciente.id} />

                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={paciente.nombre}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="localidad" className="block text-sm font-medium text-gray-700">Localidad</label>
                    <input
                        type="text"
                        name="localidad"
                        defaultValue={paciente.localidad}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        defaultValue={
                            paciente.fecha_nacimiento
                                ? new Date(paciente.fecha_nacimiento).toISOString().split('T')[0]
                                : ''
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Modificar
                    </button>
                </div>
            </form>
        </div>

    );
}

export default PageModificar;