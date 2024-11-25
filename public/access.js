document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user/profile', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Nie udało się pobrać informacji');
        }

        const data = await response.json();

        if (data && data.data && typeof data.data === 'object') {
            showUserData(data);
        }
        else {
            throw new Error("Nie udało się pobrać informacji");
        }
    }
    catch (err) {
        console.error(err);
        showErrorMessage(`${err.message}`);
    }
});

function showUserData(data) {
    const field = document.getElementById('user-data');

    field.textContent = `Id: ${data.data.id}, email: ${data.data.email}`;
}

function showErrorMessage(errorMessage) {
    const field = document.getElementById('user-data');

    field.textContent = `Błąd: ${errorMessage}`;
    field.style.color = 'red';
}