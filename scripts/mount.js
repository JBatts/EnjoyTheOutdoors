// Waits for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const mountSel = document.getElementById("mountSel"); // Dropdown for selecting mountains
    const mountainDetails = document.getElementById("mountainDetails"); // Section to display mountain details
    const resetBtn = document.getElementById("reset"); // Reset button to clear selection

    // Add default "Please Select Below" and "Show All Mountains" options to the dropdown
    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Empty value for default option
    defaultOption.textContent = "Please Select Below"; // Display text
    mountSel.appendChild(defaultOption); // Add to dropdown

    const showAllOption = document.createElement("option");
    showAllOption.value = "all"; // Value to indicate showing all mountains
    showAllOption.textContent = "Show All Mountains"; // Display text
    mountSel.appendChild(showAllOption); // Add to dropdown

    // Populate dropdown with mountain names from `mountainsArray`
    mountainsArray.forEach(mountain => {
        const option = document.createElement("option");
        option.value = mountain.name; // Set value to the mountain's name
        option.textContent = mountain.name; // Display the mountain's name
        mountSel.appendChild(option); // Add to dropdown
    });

    // Event listener to display mountain details based on the selected option
    mountSel.addEventListener("change", () => {
        mountainDetails.innerHTML = ""; // Clear previous details

        if (mountSel.value === "") {
            // If "Please Select Below" is selected, hide the details section
            mountainDetails.style.display = "none";
            return; // Exit the function
        }

        if (mountSel.value === "all") {
            // If "Show All Mountains" is selected, display details for all mountains
            mountainsArray.forEach(displayMountainDetails);
        } else {
            // Find the selected mountain from `mountainsArray` and display its details
            const selectedMountain = mountainsArray.find(mountain => mountain.name === mountSel.value);
            if (selectedMountain) {
                displayMountainDetails(selectedMountain);
            }
        }
    });

    // Reset button functionality to clear dropdown selection and hide details
    resetBtn.addEventListener("click", () => {
        mountSel.value = ""; // Reset the dropdown to default option
        mountainDetails.style.display = "none"; // Hide the details section
        mountainDetails.innerHTML = ""; // Clear displayed details
    });

    // Fetches sunrise and sunset data for a mountain's coordinates
    async function getSunsetForMountain(lat, lng) {
        try {
            const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);

            // Check if the response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`); // Throw error if response is not ok
            }

            const data = await response.json(); // Parse response as JSON
            return data.results; // Return sunrise and sunset data
        } catch (error) {
            console.error('Error fetching sunset data:', error); // Log the error to the console
            alert('Unable to fetch sunset data. Please try again later.'); // Notify the user of the error
            return null; // Return null if an error occurs
        }
    }

    // Function to display details of a specific mountain
    function displayMountainDetails(mountain) {
        mountainDetails.style.display = "block"; // Show the details section

        // Create a container for mountain details
        const mountainInfo = document.createElement("div");
        mountainInfo.classList.add("mountain-box"); // Add a class for styling
        mountainInfo.innerHTML = `
            <h3>${mountain.name}</h3>
            <img src="${mountain.img}" alt="${mountain.name}" style="width: 300px; height: auto;">
            <p><b>Description:</b> ${mountain.desc}</p>
            <p><b>Elevation:</b> ${mountain.elevation} Feet</p>
            <p><b>Effort:</b> ${mountain.effort}</p>
        `;

        // Button to fetch and display sunrise/sunset data
        const sunButton = document.createElement("button");
        sunButton.textContent = "Show Sunrise/Sunset";
        sunButton.addEventListener("click", async () => {
            const sunData = await getSunsetForMountain(mountain.lat, mountain.lng); // Fetch sunrise/sunset data
            if (sunData) {
                // Create a paragraph to display sunrise and sunset times
                const sunInfo = document.createElement("p");
                sunInfo.innerHTML = `
                    <b>Sunrise:</b> ${sunData.sunrise} (<em>Local Time</em>)<br>
                    <b>Sunset:</b> ${sunData.sunset} (<em>Local Time</em>)
                `;
                mountainInfo.appendChild(sunInfo); // Append sunrise/sunset data to the details
                sunButton.disabled = true; // Disable the button after data is fetched
            }
        });

        // Append the mountain details and the button to the details section
        mountainDetails.appendChild(mountainInfo);
        mountainInfo.appendChild(sunButton);
    }
});
