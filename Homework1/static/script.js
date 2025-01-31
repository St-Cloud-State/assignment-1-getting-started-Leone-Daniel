// Function to submit new application
function submitApplication() {
    const name = document.getElementById('name').value;
    const zipcode = document.getElementById('zipcode').value;

    const applicationData = {
        name: name,
        zipcode: zipcode
    };

    fetch('/api/submit_application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('applicationResult');
        resultDiv.innerHTML = `Application submitted! Your application number is: ${data.application_number}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to check status
function checkStatus() {
    const appNumber = document.getElementById('checkAppNumber').value;
    
    fetch(`/api/check_status/${appNumber}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('statusResult');
        resultDiv.innerHTML = `Status: ${data.status}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to update status
function updateStatus() {
    const appNumber = document.getElementById('updateAppNumber').value;
    const newStatus = document.getElementById('newStatus').value;
    
    const updateData = {
        application_number: appNumber,
        status: newStatus
    };

    fetch('/api/update_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('updateResult');
        resultDiv.innerHTML = `Status updated successfully to: ${newStatus}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}