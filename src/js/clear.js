// clear.js
document.addEventListener("DOMContentLoaded", function () {
    const clearButton = document.getElementById("clear-button");

    if (clearButton) {
        clearButton.addEventListener("click", function() {
            // Limpiar los campos de entrada
            document.getElementById("energy-consumption").value = '';
            document.getElementById("water-consumption").value = '';
            document.getElementById("office-supplies").value = '';
            document.getElementById("cleaning-products").value = '';
            document.getElementById("solar-panels").value = '';
            document.getElementById("solar-production").value = '';
            document.getElementById("period").value = '1y'; // Reset a default value if needed

            // Restablecer otros valores que necesites limpiar
            document.getElementById("adjusted-consumption").textContent = "0 kWh";

            // Limpiar el gráfico si es necesario
            const ctx = document.getElementById("consumptionChart").getContext("2d");
            const chart = Chart.getChart("consumptionChart"); // Obtener el gráfico
            if (chart) {
                chart.clear();
                chart.update();
            }
        });
    }
});

