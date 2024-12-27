
// JavaScript for Contact Form Functionality

document.getElementById("saveButton").addEventListener("click", function () {
    // Get form elements
    const form = document.getElementById("contactForm");

    // Collect form data into an object
    const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        address: form.address.value.trim(),
        features: [
            parseFloat(form.feature1.value),
            parseFloat(form.feature2.value),
            parseFloat(form.feature3.value),
            parseFloat(form.feature4.value),
            parseFloat(form.feature5.value),
        ],
    };

    // Validate the inputs
    const errors = validateInputs(data);
    if (errors.length > 0) {
        alert("Klaidos:\n" + errors.join("\n"));
        return;
    }

    // Calculate the average of the features
    const average =
        data.features.reduce((sum, value) => sum + value, 0) / data.features.length;

    // Determine color based on average
    let color = "green";
    if (average < 3) color = "red";
    else if (average < 7) color = "orange";

    // Log the data in the console
    console.log(data);

    // Display the results on the page
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p><strong>Vardas:</strong> ${data.firstName}</p>
        <p><strong>Pavardė:</strong> ${data.lastName}</p>
        <p><strong>El. paštas:</strong> ${data.email}</p>
        <p><strong>Telefonas:</strong> ${data.phone}</p>
        <p><strong>Adresas:</strong> ${data.address}</p>
        ${data.features
            .map((feature, index) => `<p><strong>Požymis ${index + 1}:</strong> ${feature}</p>`)
            .join("")}
        <p style="color: ${color};"><strong>${data.firstName} ${data.lastName} (${data.email}):</strong> Vidurkis: ${average.toFixed(
        2
    )}</p>
    `;
});

// Function to validate input fields
function validateInputs(data) {
    const errors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push("Netinkamas el. paštas");
    }

    // Phone validation
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!phoneRegex.test(data.phone)) {
        errors.push("Netinkamas telefono numeris");
    }

    // Address validation
    if (data.address.trim().length < 5) {
        errors.push("Adresas per trumpas");
    }

    // Ensure all features are valid numbers
    data.features.forEach((feature, index) => {
        if (isNaN(feature)) {
            errors.push(`Požymis ${index + 1} turi būti skaičius`);
        }
    });

    return errors;
}