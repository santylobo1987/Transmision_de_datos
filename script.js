import powerbi from 'powerbi-client';

let report;

function initializeDashboard() {
    const embedContainer = document.getElementById('dashboard');
    const config = {
        type: 'report',
        id: 'TU_ID_DE_REPORTE', // Reemplaza con el ID de tu reporte de Power BI
        embedUrl: 'TU_URL_DE_EMBED', // Reemplaza con la URL de embed de tu reporte
        accessToken: 'TU_TOKEN_DE_ACCESO', // Si es necesario
        permissions: powerbi.models.Permissions.All,
        filters: [],
    };

    powerbi.embed(embedContainer, config);
    report = powerbi.get(embedContainer);
}

document.getElementById('aplicarFiltros').addEventListener('click', async () => {
    let fecha = document.getElementById('fecha').value;
    let departamento = document.getElementById('departamento').value;
    let municipio = document.getElementById('municipio').value;

    let filters = [];

    if (fecha) {
        // Formato de fecha para Power BI (¡Esto puede ser complicado!)
        // Asegúrate de que el formato coincida con el esperado por tu reporte
        filters.push({
            $filter: `Tabla/Fecha eq '${fecha}'` // Ajusta 'Tabla/Fecha'
        });
    }

    if (departamento) {
        filters.push({
            $filter: `Tabla/Departamento eq '${departamento}'` // Ajusta 'Tabla/Departamento'
        });
    }

    if (municipio) {
        filters.push({
            $filter: `Tabla/Municipio eq '${municipio}'` // Ajusta 'Tabla/Municipio'
        });
    }

    try {
        await report.setFilters(filters);
    } catch (error) {
        console.error("Error al aplicar los filtros:", error);
    }
});