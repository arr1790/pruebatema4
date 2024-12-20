import connection from "@/lib/mysql";
import menu from "@/components/menu";

async function PaginaPacientes({ params }) {
    const { id } = await params; // Obtén el parámetro directamente

    // Realiza la consulta para obtener los datos del alumno
    const [[paciente]] = await connection.query("SELECT * FROM pacientes WHERE id = ?", [id]);

   

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Información del Paciente</h1>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">ID:</span> {paciente.id}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Nombre:</span> {paciente.nombre}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Localidad:</span> {paciente.localidad}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Fecha de nacimiento:</span>{" "}
                        {new Date(paciente.fecha_nacimiento).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaginaPacientes;
