// Función para calcular el consumo ajustado de energía
function calculateSolarEnergy() {
    // Obtener los valores de entrada
    const solarPanels = parseFloat(document.getElementById('solar-panels').value) || 0; // Si no hay valor, usar 0
    const solarProduction = parseFloat(document.getElementById('solar-production').value) || 0; // Si no hay valor, usar 0
    const energyConsumption = parseFloat(document.getElementById('energy-consumption').value) || 0; // Si no hay valor, usar 0

    // Calcular la producción total de energía solar
    const totalSolarEnergy = solarPanels * solarProduction;

    // Calcular el consumo ajustado restando la producción solar al consumo eléctrico
    let adjustedConsumption = energyConsumption - totalSolarEnergy;

    // Si el valor es negativo, mostrar 0 kWh
    if (adjustedConsumption < 0) {
        adjustedConsumption = 0;
    }

    // Mostrar el consumo ajustado en la interfaz
    const adjustedConsumptionElement = document.getElementById('adjusted-consumption');
    adjustedConsumptionElement.innerText = `${adjustedConsumption} kWh`;
}

// Función para actualizar el cálculo al cambiar valores
function setupListeners() {
    // Añadir event listeners para que se ejecute cuando cambian los valores
    document.getElementById('solar-panels').addEventListener('input', calculateSolarEnergy);
    document.getElementById('solar-production').addEventListener('input', calculateSolarEnergy);
    document.getElementById('energy-consumption').addEventListener('input', calculateSolarEnergy);
}

// Llamamos a la función para configurar los event listeners al cargar la página
window.onload = setupListeners;