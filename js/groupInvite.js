// 🔐 AES Encryption Secret Key (Same on Backend)
const SECRET_KEY = "YourSecretKey123!";

// 🔒 Function to Encrypt `group_id` and `cat_id`
function encryptId(id) {
    return CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
}

// Function to Fetch Group Details
async function fetchGroupDetails(groupId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/groups/${groupId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch group details");
        }

        const group = await response.json();
        displayGroupDetails(group);
    } catch (error) {
        console.error("Error fetching group details:", error);
        document.getElementById("groupDetailsContainer").innerHTML = 
            "<p class='text-center text-danger'>Failed to load group details.</p>";
    }
}

// Function to Display Group Details
function displayGroupDetails(group) {
    const encryptedGroupId = encryptId(group.group_id);
    const encryptedCatId = encryptId(group.cat_id);

    const groupDetailsContainer = document.getElementById("groupDetailsContainer");
    groupDetailsContainer.innerHTML = `
        <div class="card mb-3 border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <img src="${group.group_image || 'default_icon.png'}" class="rounded-circle me-3" width="50" height="50" alt="Group Icon">
                    <div>
                        <h6 class="mb-0">${group.group_name}</h6>
                        <small class="text-muted">${group.cat_name} || ${group.country} || ${group.language}</small>
                    </div>
                </div>
                <p class="mt-2">${group.group_desc}</p>
                <p class="mt-2"><strong>Rules:</strong> ${group.group_rules}</p>
                <p class="mt-2"><strong>Tags:</strong> ${group.tags}</p>
                <hr>
                <a href="${group.group_link}" class="btn btn-success btn-sm" target="_blank">Join WhatsApp Group</a>
                <a href="/pages/groupInvite/groupInvite.html?group=${encodeURIComponent(encryptedGroupId)}&cat=${encodeURIComponent(encryptedCatId)}" class="btn btn-outline-primary btn-sm">Invite</a>
            </div>
        </div>
    `;
}

// Automatically fetch group details if an ID is provided in URL
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get("group_id");
    
    if (groupId) {
        fetchGroupDetails(groupId);
    }
});
