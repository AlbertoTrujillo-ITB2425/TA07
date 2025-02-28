// FunciÃ³n para manejar la carga de archivos
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const fileName = file.name.toLowerCase();
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;

            if (fileName.endsWith(".csv")) {
                parseCSV(fileContent);
            } else if (fileName.endsWith(".json")) {
                parseJSON(fileContent);
            } else {
                alert("Solo se permiten archivos CSV o JSON.");
            }
        };

        reader.readAsText(file);
    }
}

// FunciÃ³n para parsear CSV
function parseCSV(csvText) {
    const rows = csvText.split("\n");

    // Si el CSV tiene un encabezado, se elimina la primera fila
    const headers = rows[0].split(",");
    const isHeaderPresent = headers.every(cell => isNaN(cell.trim())); // Si todos los valores son texto, asumimos que hay encabezado

    // Extraer las fechas de cada fila
    const dates = [];
    const dataRows = isHeaderPresent ? rows.slice(1) : rows;
    const parsedData = dataRows.map(row => {
        const cells = row.split(",");
        if (cells.length > 0) {
            dates.push(cells[0]); // La primera columna es la fecha
        }
        return cells;
    });

    // Mostrar las fechas en un selector
    const dateSelector = document.createElement('select');
    dateSelector.classList.add("p-3", "border", "rounded-lg", "w-full", "bg-gray-100", "hover:bg-gray-200", "transition-all");
    dateSelector.addEventListener('change', function () {
        loadDataForDate(parsedData, dateSelector.value);
    });

    // Agregar la opciÃ³n de seleccionar fecha
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Selecciona una fecha";
    dateSelector.appendChild(defaultOption);

    // Agregar las fechas al selector
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelector.appendChild(option);
    });

    // Mostrar el selector de fechas en la interfaz
    const dateSelectionContainer = document.getElementById('date-selection-container');
    if (dateSelectionContainer) {
        dateSelectionContainer.innerHTML = ''; // Limpiar contenedor
        dateSelectionContainer.appendChild(dateSelector);
    }
}

// FunciÃ³n para cargar los datos de la fila seleccionada
function loadDataForDate(parsedData, selectedDate) {
    const row = parsedData.find(row => row[0] === selectedDate);

    if (row) {
        // Asignar los valores a los inputs del formulario
        document.getElementById('energy-consumption').value = row[1]; // Consumo elÃ©ctrico
        document.getElementById('water-consumption').value = row[2]; // Consumo de agua
        document.getElementById('office-supplies').value = row[3]; // Consumo de materiales
        document.getElementById('cleaning-products').value = row[4] || 0; // Consumo de productos de limpieza
        document.getElementById('solar-panels').value = row[5]; // NÃºmero de paneles solares
        document.getElementById('solar-production').value = row[6]; // ProducciÃ³n solar por panel
        const periodType = row[7] || '1y'; // Tipo de periodo desde el CSV (por defecto '1y' si no se proporciona)

        // Desactivar los campos para evitar que el usuario los edite
        disableFields();

        // Llamamos a la funciÃ³n para calcular la energÃ­a solar despuÃ©s de cargar los valores
        calculateSolarEnergy(periodType); // Este cÃ¡lculo se mueve a otro archivo
    }
}

// FunciÃ³n para deshabilitar los campos
function disableFields() {
    document.getElementById('energy-consumption').disabled = true;
    document.getElementById('water-consumption').disabled = true;
    document.getElementById('office-supplies').disabled = true;
    document.getElementById('cleaning-products').disabled = true;
    document.getElementById('solar-panels').disabled = true;
    document.getElementById('solar-production').disabled = true;
}

// FunciÃ³n para parsear JSON
function parseJSON(jsonText) {
    try {
        const parsedData = JSON.parse(jsonText);
        const dates = parsedData.map(entry => entry.date);

        // Mostrar las fechas en un selector
        const dateSelector = document.createElement('select');
        dateSelector.classList.add("p-3", "border", "rounded-lg", "w-full", "bg-gray-100", "hover:bg-gray-200", "transition-all");
        dateSelector.addEventListener('change', function () {
            loadDataForDate(parsedData, dateSelector.value);
        });

        // Agregar la opciÃ³n de seleccionar fecha
        const defaultOption = document.createElement('option');
        defaultOption.textContent = "Selecciona una fecha";
        dateSelector.appendChild(defaultOption);

        // Agregar las fechas al selector
        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dateSelector.appendChild(option);
        });

        // Mostrar el selector de fechas en la interfaz
        const dateSelectionContainer = document.getElementById('date-selection-container');
        if (dateSelectionContainer) {
            dateSelectionContainer.innerHTML = ''; // Limpiar contenedor
            dateSelectionContainer.appendChild(dateSelector);
        }

    } catch (error) {
        alert("Error al procesar el archivo JSON.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el input del archivo
    const fileInput = document.getElementById('fileInput');
    
    // Evento para cuando se selecciona un archivo
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        if (file && file.type === "text/csv") {
            const reader = new FileReader(); // Crear un lector de archivos
            
            // Evento cuando se carga el archivo correctamente
            reader.onload = function(e) {
                const csvText = e.target.result; // Obtener el contenido del archivo CSV
                parseCSV(csvText); // Procesar el archivo CSV
            };

            // Leer el archivo como texto
            reader.readAsText(file);
        } else {
            alert("Por favor, selecciona un archivo CSV.");
        }
    });

    // Función para procesar el CSV
    function parseCSV(csvText) {
        const rows = csvText.split("\n"); // Dividir el archivo CSV en filas
        const table = document.createElement('table'); // Crear una tabla HTML
        
        rows.forEach((row, index) => {
            const cells = row.split(","); // Dividir cada fila en celdas
            const tr = document.createElement('tr'); // Crear una fila de tabla

            cells.forEach(cell => {
                const td = document.createElement('td'); // Crear una celda
                td.textContent = cell.trim(); // Agregar el contenido de la celda
                tr.appendChild(td); // Añadir la celda a la fila
            });

            table.appendChild(tr); // Añadir la fila a la tabla
        });

        // Mostrar la tabla en el HTML
        document.getElementById('output').innerHTML = '';
        document.getElementById('output').appendChild(table);
    }
});
