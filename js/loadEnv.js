window.ENV_VARS = {};

async function loadEnv() {
    try {
        // Use an absolute path to always fetch from the root
        const response = await fetch("/env.json"); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        window.ENV_VARS = await response.json();
        console.log("Environment variables loaded:", window.ENV_VARS);
        document.dispatchEvent(new Event("envLoaded"));
    } catch (error) {
        console.error("Failed to load env.json", error);
    }
}

// Call the function to load environment variables
loadEnv();
