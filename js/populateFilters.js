document.addEventListener("DOMContentLoaded", function () {
    // Generic function for filters with ID and Name structure
    async function fetchAndPopulateFilter(selectId, apiUrl, defaultText, key = "id", value = "name") {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const selectElement = document.getElementById(selectId);
            if (!selectElement) return;

            selectElement.innerHTML = `<option value="">${defaultText}</option>`;

            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item[key];  // Set option value
                option.textContent = item[value]; // Set option text
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error(`Error fetching data for ${selectId}:`, error);
        }
    }

    // Function to fetch and populate Countries
    async function fetchAndPopulateCountries(selectId, apiUrl, languageSelectId) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const selectElement = document.getElementById(selectId);
            if (!selectElement) return;

            selectElement.innerHTML = `<option value="">Any Country</option>`;

            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.country;  // Set value to country name
                option.textContent = item.country; // Display country name
                selectElement.appendChild(option);
            });

            // Add event listener to fetch languages when country is selected
            selectElement.addEventListener("change", function () {
                const selectedCountry = this.value;
                if (selectedCountry) {
                    fetchAndPopulateLanguages(languageSelectId, `http://127.0.0.1:8000/api/countries/languages/${selectedCountry}`);
                } else {
                    resetDropdown(languageSelectId, "Any Language"); // Reset languages if no country is selected
                }
            });

        } catch (error) {
            console.error(`Error fetching countries:`, error);
        }
    }

    // Function to fetch and populate Languages based on selected Country
    async function fetchAndPopulateLanguages(selectId, apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
        
            const selectElement = document.getElementById(selectId);
            if (!selectElement) return;
        
            selectElement.innerHTML = `<option value="">Any Language</option>`;
        
            if (data.languages && Array.isArray(data.languages)) {
                data.languages.forEach(language => {
                    const option = document.createElement("option");
                    option.value = language;  // Set value to language name
                    option.textContent = language; // Display language name
                    selectElement.appendChild(option);
                });
            }
        
        } catch (error) {
            console.error(`Error fetching languages:`, error);
        }
    }

    // Function to reset a dropdown
    function resetDropdown(selectId, defaultText) {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
            selectElement.innerHTML = `<option value="">${defaultText}</option>`;
        }
    }

    // Expose functions globally so they can be used on other pages
    window.fetchAndPopulateFilter = fetchAndPopulateFilter;
    window.fetchAndPopulateCountries = fetchAndPopulateCountries;
    window.fetchAndPopulateLanguages = fetchAndPopulateLanguages;
    window.resetDropdown = resetDropdown;
});
