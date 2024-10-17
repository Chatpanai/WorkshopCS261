const authToken = '';

function submitLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // to hide result container before show
    const resultContainer = document.getElementById('resultContainer');
    const loginBox = document.querySelector('.login-box');
    resultContainer.style.display = 'none';
    loginBox.style.display = 'none';
    document.getElementById('message').innerHTML = '';

    // to check that username & password have been fill
    if(username === "" || password === ""){
        resultContainer.style.display = 'block';
        document.getElementById('message').innerHTML = '<span class="error-message">Please input all box</span>';
        return;
    }

    // to fetch api
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': authToken 
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })

    .then(response => {
        if (!response.ok) {
            resultContainer.style.display = 'block';
            document.getElementById('message').innerHTML = '<span class="error-message">Incorrect input</span>';
            }
            return response.json();
    })

    // to show the data of user
    .then(data => {
        const status = data.status ?? false;
        if (status === true) {
            const tu_status = data.tu_status;
            const username = data.username;
            const displayname_th = data.displayname_th;
            const displayname_en = data.displayname_en;
            const statusid = data.statusid;
            const email = data.email;
            const type = data.type;
            const department = data.department;
            const faculty = data.faculty;
            
            // Show the result container
            resultContainer.style.display = 'block';
            document.getElementById('message').innerHTML = `TU Status: ${tu_status}<br>Username: ${username}<br>Display Name (TH): ${displayname_th}<br>Display Name (EN): ${displayname_en}<br>Status ID: ${statusid}<br>Email: ${email}<br>Type: ${type}<br>Department: ${department}<br>Faculty: ${faculty}`;
        }
        console.log('Response Data:', data);

    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred: ' + error.message;
    });
}

// funtion to close result-container
function closeResult() {
    const resultContainer = document.getElementById('resultContainer');
    const loginBox = document.querySelector('.login-box');
    resultContainer.style.display = 'none';
    loginBox.style.display = 'block';
    console.log("Close icon clicked");
}


/*
function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password }).toString()
    );

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': authToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const status = data.status ?? 'false';
        const tu_status = data.tu_status ?? 'N/A';
        const message = data.message ?? 'No message returned';
        const username = data.username ?? 'N/A';
        const displayname_th = data.displayname_th ?? 'N/A';
        const displayname_en = data.displayname_en ?? 'N/A';
        const statusid = data.statusid ?? 'N/A';
        const email = data.email ?? 'N/A';
        const type = data.type ?? 'N/A';
        const department = data.department ?? 'N/A';
        const faculty = data.faculty ?? 'N/A';

        document.getElementById('message').innerHTML = 
            `Status: ${status}<br>TU Status: ${tu_status}<br>Message: ${message}<br>Username: ${username}<br>Display Name (TH): ${displayname_th}<br>Display Name (EN): ${displayname_en}<br>Status ID: ${statusid}<br>Email: ${email}<br>Type: ${type}<br>Department: ${department}<br>Faculty: ${faculty}`;

            console.log('Response Data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred: ' + error.message;
    });
}
*/