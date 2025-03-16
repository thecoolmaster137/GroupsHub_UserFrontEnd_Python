document.addEventListener("DOMContentLoaded", function () {
    const SECRET_KEY = "YourSecretKey123!";

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
            const cat_id = decryptedValues.cat_id;
            const group_id = decryptedValues.group_id;

            console.log("Category ID:", cat_id);
            console.log("Group ID:", group_id);

            fetchGroupDetails(cat_id, group_id);
        }
    }
});

function fetchGroupDetails(catId, groupId) {
    fetch(`http://127.0.0.1:8000/api/categories/${catId}/groups`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const selectedGroup = data.find(group => group.group_id == groupId);
                if (selectedGroup) {
                    displayGroupDetails(selectedGroup);
                }
                displayRelatedGroups(data, groupId);
            } else {
                console.error("No groups found.");
            }
        })
        .catch(error => console.error("Error fetching groups:", error));
}

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

    document.getElementById("groupInfo").style.display = "block"; // Show section
}

// function displayRelatedGroups(groups, excludeGroupId) {
//     const relatedGroupsContainer = document.getElementById("relatedGroups");
//     relatedGroupsContainer.innerHTML = ""; // Clear previous content

//     const filteredGroups = groups.filter(group => group.group_id != excludeGroupId);

//     filteredGroups.forEach(group => {
//         const groupCard = document.createElement("div");
//         groupCard.classList.add("col-md-4", "mb-3", "d-flex");

//         groupCard.innerHTML = `
//             <div class="card shadow-sm d-flex flex-column w-100">
//                 <img src="${group.group_image}" class="card-img-top" alt="${group.group_name}" style="height: 150px; object-fit: cover;">
//                 <div class="card-body d-flex flex-column">
//                     <h5 class="card-title">${group.group_name}</h5>
//                     <p class="card-text flex-grow-1" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
//                         ${group.group_desc || "No description available."}
//                     </p>
//                     <a href="${group.group_link}" target="_blank" class="btn btn-primary mt-auto">Join</a>
//                 </div>
//             </div>
//         `;
//         relatedGroupsContainer.appendChild(groupCard);
//     });

//     document.getElementById("relatedGroupsSection").style.display = "block"; // Show section
// }

function displayRelatedGroups(groups, excludeGroupId) {
    const relatedGroupsContainer = document.getElementById("relatedGroups");
    relatedGroupsContainer.innerHTML = ""; // Clear previous content

    const filteredGroups = groups.filter(group => group.group_id != excludeGroupId);

    filteredGroups.forEach(group => {
        const groupCard = document.createElement("div");
        groupCard.classList.add("col-md-4", "mb-3", "d-flex");

        groupCard.innerHTML = `
            <div class="card shadow-sm d-flex flex-column w-100">
                <div class="d-flex justify-content-center align-items-center" style="height: 150px; background-color: #f8f9fa;">
                    <img src="${group.group_image}" class="card-img-top" alt="${group.group_name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${group.group_name}</h5>
                    <p class="card-text flex-grow-1 text-truncate" style="max-height: 50px;">
                        ${group.group_desc || "No description available."}
                    </p>
                    <a href="${group.group_link}" target="_blank" class="btn btn-primary mt-auto">Join</a>
                </div>
            </div>
        `;
        relatedGroupsContainer.appendChild(groupCard);
    });

    document.getElementById("relatedGroupsSection").style.display = "block"; // Show section
}



function shareGroup() {
    alert("Share functionality coming soon!");
}
