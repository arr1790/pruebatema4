import connection from "@/lib/mysql";






async function PaginaMedicos({ params }) {
    const { id } = await params;
    const response = await fetch(`http://localhost:4000/medicos/${id}`);

    const medico = await response.json()



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Información del Medico</h1>
                <div className="space-y-2">
                <p className="text-gray-600">
                        <span className="font-medium text-gray-800">ID:</span> {medico.id}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Nombre:</span> {medico.nombre}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Especialidad:</span> {medico.especialidad}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Perfil:</span> {medico.perfil}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default PaginaMedicos;