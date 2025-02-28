function calculateConsumption() {
    // Obtener los datos de entrada
    const energy = parseFloat(document.getElementById('energy-consumption').value);
    const adjustedEnergy = parseFloat(document.getElementById('adjusted-consumption').innerText) || 0;  // Obtener adjusted-consumption y permitir 0
    const water = parseFloat(document.getElementById('water-consumption').value);
    const office = parseFloat(document.getElementById('office-supplies').value);
    const cleaning = parseFloat(document.getElementById('cleaning-products').value);
    const period = document.getElementById('period').value;

    // Validar si todos los campos están correctamente llenados
    if (isNaN(energy) || isNaN(water) || isNaN(office) || isNaN(cleaning)) {
        alert("Por favor, asegúrate de que todos los campos contienen valores numéricos válidos.");
        return;
    }

    if (energy <= 0 || water <= 0 || office <= 0 || cleaning <= 0) {
        alert("Por favor, los valores deben ser positivos.");
        return;
    }

// Función para determinar el mensaje y el color en función del consumo
function getConsumptionColor(value, type) {
    let message = "";
    let messageColor = "";
    let borderColor = "";

    // Límite anual por cada tipo de consumo basado en sostenibilidad
    const annualLimits = {
        energy: 200000,  // kWh por año - un valor más alto para hogares o empresas con mayor consumo de energía
        water: 3000000,
        office: 20000,
        cleaning: 10000
    };


    // Lógica de colores para el consumo energético
    if (type === 'energy') {
        if (value > annualLimits.energy * 2) {
            message = "El teu consum energètic és extremadament alt! Redueix el consum d'energia per protegir el medi ambient.";
            messageColor = "text-red-600";
            borderColor = "border-red-600";
        } else if (value > annualLimits.energy * 1.5) {
            message = "El teu consum energètic és molt alt! Considera mesures d'eficiència energètica.";
            messageColor = "text-orange-600";
            borderColor = "border-orange-600";
        } else if (value > annualLimits.energy) {
            message = "El teu consum energètic és elevat! Redueix el consum i opta per fonts d'energia renovables.";
            messageColor = "text-yellow-600";
            borderColor = "border-yellow-600";
        } else if (value > annualLimits.energy * 0.5) {
            message = "El teu consum energètic és acceptable! Continua amb bones pràctiques d'eficiència energètica.";
            messageColor = "text-yellow-400";
            borderColor = "border-yellow-400";
        } else {
            message = "El teu consum energètic és excel·lent! Felicitats per mantenir un baix consum energètic.";
            messageColor = "text-green-500";
            borderColor = "border-green-500";
        }
    }

    // Lógica de colores para el consumo de agua
    if (type === 'water') {
        if (value > annualLimits.water * 2) {
            message = "El teu consum d'aigua és extremadament alt! L'aigua és un recurs limitat, redueix el teu consum.";
            messageColor = "text-red-600";
            borderColor = "border-red-600";
        } else if (value > annualLimits.water * 1.5) {
            message = "El teu consum d'aigua és molt alt! Considera mesures d'estalvi d'aigua.";
            messageColor = "text-orange-600";
            borderColor = "border-orange-600";
        } else if (value > annualLimits.water) {
            message = "El teu consum d'aigua és elevat! Pots reduir el consum per contribuir a la sostenibilitat.";
            messageColor = "text-yellow-600";
            borderColor = "border-yellow-600";
        } else if (value > annualLimits.water * 0.5) {
            message = "El teu consum d'aigua és acceptable! Continua amb pràctiques d'estalvi d'aigua.";
            messageColor = "text-yellow-400";
            borderColor = "border-yellow-400";
        } else {
            message = "El teu consum d'aigua és excel·lent! Segueix mantenint hàbits d'estalvi d'aigua.";
            messageColor = "text-green-500";
            borderColor = "border-green-500";
        }
    }

    // Lógica de colores para el consumo de materiales escolares
    if (type === 'office') {
        if (value > annualLimits.office * 2) {
            message = "El teu consum de materials escolars és extremadament alt! Redueix el consum i opta per materials reutilitzables.";
            messageColor = "text-red-600";
            borderColor = "border-red-600";
        } else if (value > annualLimits.office * 1.5) {
            message = "El teu consum de materials escolars és molt alt! Considera alternatives més sostenibles.";
            messageColor = "text-orange-600";
            borderColor = "border-orange-600";
        } else if (value > annualLimits.office) {
            message = "El teu consum de materials escolars és elevat! Redueix el consum i reutilitza materials.";
            messageColor = "text-yellow-600";
            borderColor = "border-yellow-600";
        } else if (value > annualLimits.office * 0.5) {
            message = "El teu consum de materials escolars és acceptable! Pots continuar amb bones pràctiques de consum responsable.";
            messageColor = "text-yellow-400";
            borderColor = "border-yellow-400";
        } else {
            message = "El teu consum de materials escolars és excel·lent! Continua amb el teu compromís amb la sostenibilitat.";
            messageColor = "text-green-500";
            borderColor = "border-green-500";
        }
    }

    // Lógica de colores para el consumo de productos de limpieza
    if (type === 'cleaning') {
        if (value > annualLimits.cleaning * 2) {
            message = "El teu consum de productes de neteja és extremadament alt! Opta per productes ecològics i redueix el consum.";
            messageColor = "text-red-600";
            borderColor = "border-red-600";
        } else if (value > annualLimits.cleaning * 1.5) {
            message = "El teu consum de productes de neteja és molt alt! Redueix l'ús de productes químics agressius.";
            messageColor = "text-orange-600";
            borderColor = "border-orange-600";
        } else if (value > annualLimits.cleaning) {
            message = "El teu consum de productes de neteja és elevat! Opta per productes més ecològics i redueix el consum.";
            messageColor = "text-yellow-600";
            borderColor = "border-yellow-600";
        } else if (value > annualLimits.cleaning * 0.5) {
            message = "El teu consum de productes de neteja és acceptable! Continua utilitzant productes més sostenibles.";
            messageColor = "text-yellow-400";
            borderColor = "border-yellow-400";
        } else {
            message = "El teu consum de productes de neteja és excel·lent! Felicitats per fer servir productes ecològics.";
            messageColor = "text-green-500";
            borderColor = "border-green-500";
        }
    }

    return { message, messageColor, borderColor };
}

// Variables de cálculo
let result = "";

// Multiplicadores para cada periodo, expresados como fracciones del año o como días
const periodMultiplier = {
    '1y': 1,         // 1 año = 1
    '9m': 1.33,      // 9 meses = 1.33 veces en un año
    '6m': 2,         // 6 meses = 2 veces en un año
    '3m': 4,         // 3 meses = 4 veces en un año
    '1m': 12,        // 1 mes = 12 veces en un año
    '1w': 52,        // 1 semana = 52 semanas en un año
    '1d': 365        // 1 día = 365 días al año (para calcular el consumo anual en días)
};

 const periodDays = periodMultiplier[period];

    // Calcular los consumos anuales estimados
    const energyToUse = adjustedEnergy > 0 ? adjustedEnergy : energy;  // Usar adjustedEnergy si es mayor que 0, sino usar energy
    const energyAnnual = energyToUse * periodDays;
    const waterAnnual = water * periodDays;
    const officeAnnual = office * periodDays;
    const cleaningAnnual = cleaning * periodDays;

    // Mostrar los resultados con los colores
    const energyColor = getConsumptionColor(energyAnnual, 'energy');
    const waterColor = getConsumptionColor(waterAnnual, 'water');
    const officeColor = getConsumptionColor(officeAnnual, 'office');
    const cleaningColor = getConsumptionColor(cleaningAnnual, 'cleaning');

    // Mostrar resultados finales con colores
    document.getElementById('result').innerHTML = `
        <div class="border-l-8 ${energyColor.borderColor} p-4 mb-6">
            <p class="${energyColor.messageColor} font-semibold">${energyColor.message}</p>
        </div>
        <div class="mt-4 p-4 bg-gray-100 border-l-4 ${waterColor.borderColor}">
            <p class="${waterColor.messageColor} font-semibold">${waterColor.message}</p>
        </div>
        <div class="mt-4 p-4 bg-gray-100 border-l-4 ${officeColor.borderColor}">
            <p class="${officeColor.messageColor} font-semibold">${officeColor.message}</p>
        </div>
        <div class="mt-4 p-4 bg-gray-100 border-l-4 ${cleaningColor.borderColor}">
            <p class="${cleaningColor.messageColor} font-semibold">${cleaningColor.message}</p>
        </div>
        <div class="mt-4 p-4 bg-gray-100">
            <h3 class="text-xl font-semibold">Detalles del Consumo:</h3>
            <p><strong>Consumo eléctrico ajustado: </strong>${adjustedEnergy} kWh por año</p>
            <p><strong>Consumo de agua estimado: </strong>${waterAnnual} litros por año</p>
            <p><strong>Consumo de materiales escolares estimado: </strong>${officeAnnual} unidades por año</p>
            <p><strong>Consumo de productos de limpieza estimado: </strong>${cleaningAnnual} unidades por año</p>
        </div>
    `;

    // Destruir el gráfico anterior si existe
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Crear un nuevo gráfico de consumo
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Consumo Eléctrico', 'Consumo de Agua', 'Materiales Escolares', 'Productos de Limpieza'],
            datasets: [{
                label: 'Consumo Anual Estimado (unidades)',
                data: [energyAnnual, waterAnnual, officeAnnual, cleaningAnnual],
                backgroundColor: ['rgba(99, 129, 238, 0.5)', 'rgba(99, 238, 140, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(99, 129, 238, 1)', 'rgba(99, 238, 140, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



// Función para mostrar/ocultar los consejos
function toggleTips() {
    const tipsSection = document.getElementById('tipsSection');
    tipsSection.classList.toggle('hidden');
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Establecer el título y la fecha de hoy
    const date = new Date().toLocaleDateString();
    const title = 'Informe de Consum Sostenible';
    const headerText = `Informe generat el: ${date}`;

    // Estilo del encabezado (Título)
    doc.setFontSize(26);
    doc.setTextColor(50, 100, 150); // Azul para el título
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, 20);

    // Estilo de la fecha
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150); // Gris claro para la fecha
    doc.setFont('helvetica', 'normal');
    doc.text(headerText, 20, 30);

    // Línea divisoria
    doc.setLineWidth(1);
    doc.setDrawColor(50, 100, 150); // Azul para las líneas divisorias
    doc.line(20, 35, 190, 35);

    // Agregar los resultados (títulos de sección)
    doc.setFontSize(16);
    doc.setTextColor(50, 150, 50);  // Verde para los resultados
    doc.setFont('helvetica', 'bold');
    doc.text('Resultats de Consums:', 20, 50);

    // Consum Elèctric
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);  // Negro para el texto estándar
    doc.setFont('helvetica', 'normal');
    doc.text(`Consum elèctric: ${document.getElementById('energy-consumption').value || 0} kWh`, 20, 60);

    // Consum d'Aigua
    doc.text(`Consum d'aigua: ${document.getElementById('water-consumption').value || 0} litres`, 20, 70);

    // Consum Materials Escolars
    doc.text(`Consum de materials escolars: ${document.getElementById('office-supplies').value || 0} unitats`, 20, 80);

    // Consum Productes de Neteja
    doc.text(`Consum de productes de neteja: ${document.getElementById('cleaning-products').value || 0} unitats`, 20, 90);

    // Consum energètic ajustat
    doc.setFontSize(14);
    doc.setTextColor(255, 165, 0);  // Naranja para el valor ajustado
    doc.setFont('helvetica', 'bold');
    doc.text(`Consum energètic ajustat: ${document.getElementById('adjusted-consumption').textContent || '0'}`, 20, 110);

    // Línea divisoria
    doc.line(20, 120, 190, 120);

    // Mensaje motivacional
    doc.setFontSize(14);
    doc.setTextColor(50, 150, 50);  // Verde para el mensaje positivo
    doc.setFont('helvetica', 'italic');
    doc.text('Felicitats pel teu compromís amb la sostenibilitat!', 20, 130);

    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);  // Texto más suave
    doc.setFont('helvetica', 'normal');
    doc.text('Cada vegada que utilitzes energia solar estàs contribuint a un futur més verd i saludable per a tots.', 20, 140);
    doc.text('Segueix així, el teu esforç fa la diferència!', 20, 150);

    // Línea divisoria
    doc.line(20, 160, 190, 160);

    // Pie de página con una llamada a la acción
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Generat per la Calculadora de Consum Sostenible - G2', 20, 280);

    // Texto de contacto o llamada a la acción adicional
    doc.setFontSize(10);
    doc.text('Per més informació, visita www.g2estalvienergiat07.com', 20, 290);

    // Descargar el PDF
    doc.save('resultats_consum.pdf');
}



// Función para alternar la visibilidad de las opciones de placas solares
function toggleSolarPanels() {
    const solarPanelsSection = document.getElementById('solarPanelsSection');
    // Alterna la clase 'hidden' para mostrar u ocultar el div
    solarPanelsSection.classList.toggle('hidden');
}
    // Esta función oculta el campo de "Consum elèctric" si "Consum energètic ajustat" tiene un valor diferente de 0
    function toggleElectricConsumption() {
        const adjustedConsumption = document.getElementById('adjusted-consumption').innerText;
        const energyConsumptionInput = document.getElementById('energy-consumption');
        const energyConsumptionLabel = document.getElementById('energy-consumption-label');

        if (adjustedConsumption !== "0 kWh") {
            energyConsumptionInput.disabled = true;
            energyConsumptionLabel.innerText = "Consum energètic ajustat (kWh):";
        } else {
            energyConsumptionInput.disabled = false;
            energyConsumptionLabel.innerText = "Consum elèctric (kWh):";
        }
    }

    // Llamar a esta función cuando el valor de "Consum energètic ajustat" cambie
    const adjustedConsumption = document.getElementById('adjusted-consumption');
    if (adjustedConsumption) {
        adjustedConsumption.addEventListener('DOMSubtreeModified', toggleElectricConsumption);
    }
