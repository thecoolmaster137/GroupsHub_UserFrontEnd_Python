document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("groupForm");

    function showMessage(message, isSuccess = false) {
        const messageBody = document.getElementById("messageBody");
        const modalTitle = document.getElementById("messageModalLabel");

        modalTitle.textContent = isSuccess ? "Success" : "Error";
        messageBody.textContent = message;

        const modal = new bootstrap.Modal(document.getElementById("messageModal"));
        modal.show();
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const groupLink = document.getElementById("groupLink").value.trim();
        const category = document.getElementById("categorySelect").value;
        const country = document.getElementById("countrySelect").value;
        const language = document.getElementById("languageSelect").value;
        const appType = document.getElementById("appTypeSelect").value;
        const tags = document.getElementById("tags").value.trim();
        const groupDesc = document.getElementById("groupInfo").value.trim();

        // Validate required fields
        if (!groupLink) {
            showMessage("Please enter a valid group link.");
            return;
        }
        if (!category) {
            showMessage("Please select a category.");
            return;
        }
        if (!country) {
            showMessage("Please select a country.");
            return;
        }
        if (!language) {
            showMessage("Please select a language.");
            return;
        }
        if (!appType) {
            showMessage("Please select an application type.");
            return;
        }

        // Prepare request body
        const requestBody = {
            group_link: groupLink,
            country: country,
            language: language,
            group_desc: groupDesc || "No Description",
            group_rules: "Default Rules",
            tags: tags || "",
            app_id: parseInt(appType), // Convert to integer
            cat_id: parseInt(category)  // Convert to integer
        };

        try {
            const response = await fetch("https://groupshub-api-python.onrender.com/api/groups/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                showMessage("Group added successfully!", true);
                form.reset();
            } else {
                const errorData = await response.json();
                showMessage(`Error: ${errorData.detail || "Something went wrong"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showMessage("Failed to submit. Please try again.");
        }
    });
});
