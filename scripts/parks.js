"use strict"; // Enforces stricter parsing and error handling in JavaScript

// Waits for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select important DOM elements
    const parkSelect1 = document.getElementById("parkSelect1"); // Dropdown for location selection
    const parkSelect2 = document.getElementById("parkSelect2"); // Dropdown for park type selection
    const parkDetails = document.getElementById("parkDetails"); // Table element to display park details
    const parkBody = document.getElementById("parkBody"); // Table body to populate park data
    const reset = document.getElementById("reset"); // Reset button to clear selections
    const errorMessage = document.getElementById("errorMessage"); // Error message element for no results

    // Define default options for dropdowns
    const defaultOptions = ["Please Select Below", "All Parks"];
    
    // Add default options to both dropdowns
    defaultOptions.forEach(text => { // No need to add
        // const optionLoc = new Option(text, text); // Create option for location dropdown
        const optionType = new Option(text, text); // Create option for park type dropdown
        parkSelect1.add(new Option(text, text)); // Add to location dropdown
        parkSelect2.add(optionType); // Add to park type dropdown
    });

    // Populate the location dropdown with states from `locationsArray`
    locationsArray.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.innerHTML = state; // Display state name
        parkSelect1.appendChild(option);
    });

    // Populate the park type dropdown with park types from `parkTypesArray`
    parkTypesArray.forEach(parkType => {
        const option = document.createElement("option");
        option.value = parkType;
        option.innerHTML = parkType; // Display park type
        parkSelect2.appendChild(option);
    });

    // Function to filter parks and display results in the table
    function filterAndDisplayParks() {
        const selectedLoc = parkSelect1.value; // Get selected location
        const selectedParkType = parkSelect2.value; // Get selected park type

        parkBody.innerHTML = ""; // Clear previous table data
        
        // Filter parks based on selected location and type
        const filteredParks = nationalParksArray.filter((park) => {
            const matchesLoc =
                selectedLoc === "All Parks" || 
                (selectedLoc !== "Please Select Below" && park.State === selectedLoc);
            const matchesType =
                selectedParkType === "All Parks" || 
                (selectedParkType !== "Please Select Below" && park.LocationName.includes(selectedParkType));
            return matchesLoc && matchesType; // Only include parks that match both filters
        });

        // Show error message if no parks match the selected criteria
        if (filteredParks.length === 0 && selectedLoc !== "Please Select Below" && selectedParkType !== "Please Select Below") {
            errorMessage.style.display = "block"; // Display error message
            parkDetails.style.display = "none"; // Hide table
        } else {
            errorMessage.style.display = "none"; // Hide error message
            parkDetails.style.display = "block"; // Show table
            
            // Populate table with filtered parks
            filteredParks.forEach(park => {
                const row = document.createElement("tr");

                // Park name cell
                const nameCell = document.createElement("td");
                nameCell.innerHTML = park.LocationName;
                row.appendChild(nameCell);

                // City cell
                const cityCell = document.createElement("td");
                cityCell.innerHTML = park.City;
                row.appendChild(cityCell);

                // Address cell, show message if no address available
                const addressCell = document.createElement("td");
                addressCell.innerHTML = park.Address != 0 ? park.Address : "This location has no public address";
                row.appendChild(addressCell);

                // Phone cell, show "N/A" if no phone number available
                const phoneCell = document.createElement("td");
                phoneCell.innerHTML = park.Phone != 0 ? park.Phone : "N/A";
                row.appendChild(phoneCell);

                // Website cell, create clickable link if available
                const websiteCell = document.createElement("td");
                if (park.Visit) {
                    const link = document.createElement("a");
                    link.href = park.Visit;
                    link.innerHTML = "Open Park Website";
                    websiteCell.appendChild(link);
                } else {
                    websiteCell.innerHTML = "N/A";
                }
                row.appendChild(websiteCell);

                // Append the row to the table body
                parkBody.appendChild(row);
            });

            // Ensure the table is shown only if parks are found
            parkDetails.style.display = filteredParks.length > 0 ? "block" : "none";
        }
    }

    // Function to reset dropdowns and clear table
    function resetTable() {
        parkSelect1.value = "Please Select Below"; // Reset location dropdown
        parkSelect2.value = "Please Select Below"; // Reset park type dropdown
        parkBody.innerHTML = ""; // Clear table data
        parkDetails.style.display = "none"; // Hide table
        errorMessage.style.display = "none"; // Hide error message
    }

    // Attach event listeners to dropdowns to filter parks on change
    parkSelect1.addEventListener("change", filterAndDisplayParks);
    parkSelect2.addEventListener("change", filterAndDisplayParks);

    // Attach event listener to reset button
    reset.addEventListener("click", resetTable);
});
