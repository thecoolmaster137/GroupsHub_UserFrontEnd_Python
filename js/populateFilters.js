document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and populate data for a given dropdown
    async function fetchAndPopulateFilter(selectId, apiUrl, defaultText) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const selectElement = document.getElementById(selectId);
            if (!selectElement) return;

            // Clear existing options and add the default option
            selectElement.innerHTML = `<option value="">${defaultText}</option>`;

            // Populate dropdown with fetched data
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.name;
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error(`Error fetching data for ${selectId}:`, error);
        }
    }

    // Call the function for each filter with its respective API endpoint
    fetchAndPopulateFilter("categorySelect", "http://127.0.0.1:8000/api/categories", "Any Category");
    fetchAndPopulateFilter("countrySelect", "http://127.0.0.1:8000/api/countries", "Any Country");
    fetchAndPopulateFilter("languageSelect", "http://127.0.0.1:8000/api/languages", "Any Language");
    fetchAndPopulateFilter("applicationSelect", "http://127.0.0.1:8000/api/applications", "Application Type");
});
