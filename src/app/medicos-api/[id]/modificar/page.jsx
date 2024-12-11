import { redirect } from "next/navigation";

async function modificarMedico(formData) {
    'use server';
    const id = formData.get("id");
    const nombre = formData.get("nombre");
    const especialidad = formData.get("especialidad");
    const perfil = formData.get("perfil");

    await fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
       
        body: JSON.stringify({ nombre, especialidad, perfil}),
    });

    redirect(`/medicos-api/${id}`);
}

async function PageModificar({ params }) {
    const { id } = await params;

    // Llamado a la API para obtener datos del medico por ID
    const response = await fetch(`http://localhost:4000/medicos/${id}`);
   

    const medico = await response.json();

   

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
            <form action={modificarMedico} className="space-y-4">
                <input type="hidden" name="id" defaultValue={medico.id} />

                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={medico.nombre}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
                    <input
                        type="text"
                        name="especialidad"
                        defaultValue={medico.especialidad}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">Perfil</label>
                    <select
                        name="perfil"
                        id="perfil"
                        defaultValue={medico.perfil}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option disabled>Selecciona una opción</option>
                        <option value="especialista">Especialista</option>
                        <option value="residente">Residente</option>
                        
                    </select>
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
