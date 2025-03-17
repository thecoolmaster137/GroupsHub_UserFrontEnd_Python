const SECRET_KEY = "YourSecretKey123!"; // Replace with a secure key
let currentGroupId = null; // Store current group ID for reporting

document.addEventListener("DOMContentLoaded", function () {
    function decryptData(encryptedData) {
        try {
            const decrypted = CryptoJS.AES.decrypt(atob(encryptedData), SECRET_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error("Error decrypting data:", error);
            return null;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("data");

    if (encryptedData) {
        const decryptedValues = decryptData(encryptedData);

        if (decryptedValues) {
            const { cat_id, group_id } = decryptedValues;
            console.log("Category ID:", cat_id);
            console.log("Group ID:", group_id);

            currentGroupId = group_id; // Store for reporting
            fetchGroupDetails(cat_id, group_id);
        }
    }
});

// Encrypt data
function encryptData(data) {
    try {
        const encrypted = btoa(CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString());
        return encrypted;
    } catch (error) {
        console.error("Error encrypting data:", error);
        return null;
    }
}

// Fetch group details
function fetchGroupDetails(catId, groupId) {
    fetch(`http://127.0.0.1:8000/api/categories/${catId}/groups`)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("No groups found.");
                return;
            }

            const selectedGroup = data.find(group => group.group_id == groupId);
            if (selectedGroup) {
                displayGroupDetails(selectedGroup);
            }

            displayRelatedGroups(data, groupId, catId);
        })
        .catch(error => console.error("Error fetching groups:", error));
}

// Display group details
function displayGroupDetails(group) {
    document.getElementById("groupName").innerText = group.group_name;
    document.getElementById("groupMeta").innerHTML = `
        <span class="text-muted">&#128240; ${group.cat_name}</span> 
        <span class="text-muted">&#127757; ${group.country}</span> 
        <span class="text-muted">&#127482;&#127474; ${group.language}</span>
    `;
    document.getElementById("groupDesc").innerText = group.group_desc;
    document.getElementById("groupImage").src = group.group_image;
    document.getElementById("joinGroupBtn").href = group.group_link;

    document.getElementById("groupInfo").style.display = "block";
}


function displayRelatedGroups(groups, currentGroupId, catId) {
    const relatedGroupsContainer = document.getElementById("relatedGroups");
    relatedGroupsContainer.innerHTML = "";

    const relatedGroups = groups.filter(group => group.group_id !== currentGroupId);
    if (relatedGroups.length === 0) {
        document.getElementById("relatedGroupsSection").style.display = "none";
        return;
    }

    relatedGroups.forEach(group => {
        const groupCard = document.createElement("div");
        groupCard.className = "col-md-4";

        const encryptedData = encryptData({ cat_id: catId, group_id: group.group_id });

        groupCard.innerHTML = `
            <div class="card shadow-sm p-2" style="height: 100%;">
                <img src="${group.group_image}" class="card-img-top" alt="Group Image" style="height: 180px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${group.group_name}</h5>
                    <p class="card-text text-muted">${group.cat_name}</p>
                    <a href="groupInvite.html?data=${encryptedData}" class="btn btn-primary mt-auto">View Group</a>
                </div>
            </div>
        `;
        relatedGroupsContainer.appendChild(groupCard);
    });

    document.getElementById("relatedGroupsSection").style.display = "block";
}


// Function to show the message modal
function showMessageModal(title, message) {
    document.getElementById("messageModalTitle").innerText = title;
    document.getElementById("messageModalBody").innerText = message;

    // Show the Bootstrap modal
    const messageModal = new bootstrap.Modal(document.getElementById("messageModal"));
    messageModal.show();

    // Reload the page after 2 seconds (adjust as needed)
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// Submit Group Report
function submitReport() {
    const reason = document.getElementById("reportReason").value;
    const details = document.getElementById("reportDetails").value.trim();

    if (!reason) {
        showMessageModal("Warning", "Please select a reason for reporting.");
        return;
    }

    const apiUrl = `http://127.0.0.1:8000/api/report/?group_id=${encodeURIComponent(currentGroupId)}`;

    const reportData = {
        report_reason: reason,  // Match FastAPI expected fields
        report_desc: details
    };

    fetch(apiUrl, {  
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reportData)
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        body: data
    })))
    .then(({ status, body }) => {
        if (status >= 400) {
            throw new Error(body.detail || "Failed to submit report.");
        }

        showMessageModal("Success", "Report submitted successfully.");
    })
    .catch(error => {
        console.error("Error submitting report:", error);
        showMessageModal("Error", error.message);
    });
}

// Share Group (Placeholder function)
function shareGroup() {
    const pageUrl = window.location.href;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this group: " + pageUrl)}`;

    window.open(whatsappUrl, "_blank");
}

