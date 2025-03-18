const vacancies = [
    {
        company: "Microsoft",
        position: "UI/UX Designer",
        salary: "$3500",
        country: "USA",
        type: "Online",
        experience: "2 years",
        applied: false
    },
    {
        company: "Google",
        position: "Front-End Developer",
        salary: "$2500",
        country: "UK",
        type: "Offline",
        experience: "3 years",
        applied: false
    },
    {
        company: "GSC Game World",
        position: "3D Modeler/Graphic Designer",
        salary: "$1500",
        country: "UA",
        type: "Offline",
        experience: "None",
        applied: false
    },
    {
        company: "Epic Games",
        position: "Game Developer",
        salary: "$900",
        country: "USA",
        type: "Online",
        experience: "None",
        applied: false
    }
]; // Will be changed with database in the future

const vacanciesList = document.querySelector('.vacancies-list');

function renderVacancies() {
    const typeFilter = document.getElementById('type').value;
    const countryFilter = document.getElementById('country').value;
    const salaryFilter = document.getElementById('salary').value;
    const experienceFilter = document.getElementById('experience').value;

    vacanciesList.innerHTML = '';
    let hasVacancies = false;

    for (let i = 0; i < vacancies.length; i++) {
        const vacancy = vacancies[i];

        // Filters
        if (typeFilter !== 'all' && vacancy.type !== typeFilter) continue; // Online/offline
        if (countryFilter !== 'all' && vacancy.country !== countryFilter) continue; // Country
        if (salaryFilter !== 'all' && parseInt(vacancy.salary.replace('$', '')) < parseInt(salaryFilter)) continue; // Salary
        if (experienceFilter !== 'all' && !vacancy.experience.includes(experienceFilter)) continue; // Experience

        const vacancyCard = document.createElement('div');
        vacancyCard.classList.add('vacancy-card');

        vacancyCard.innerHTML = `
            <div class="company-name">${vacancy.company}</div>
            <div class="position">${vacancy.position}</div>
            <div class="details">
                <div class="salary">💰 ${vacancy.salary}</div>
                <div class="location">📍 ${vacancy.country}</div>
                <div class="type">📝 ${vacancy.type}</div>
                <div class="experience">💼 Experience: ${vacancy.experience}</div>
            </div>
            <button class="button" data-index="${i}">${vacancy.applied ? "Submitted" : "Send review"}</button>
        `;

        vacanciesList.appendChild(vacancyCard);
        hasVacancies = true;
    }

    // No vacancies
    if (!hasVacancies) {
        const noVacanciesMessage = document.createElement('div');
        noVacanciesMessage.classList.add('no-vacancies-message');
        noVacanciesMessage.textContent = 'Sorry, currently there are no vacancies.';
        vacanciesList.appendChild(noVacanciesMessage);
    }
}

document.getElementById('type').addEventListener('change', renderVacancies);
document.getElementById('country').addEventListener('change', renderVacancies);
document.getElementById('salary').addEventListener('change', renderVacancies);
document.getElementById('experience').addEventListener('change', renderVacancies);

renderVacancies();

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('button')) {
        const button = event.target;
        const buttonText = button.textContent.trim();

        if (buttonText === "Send review") {
            const index = button.getAttribute('data-index');
            vacancies[index].applied = true;
            button.textContent = "Submitted";
            renderVacancies();
            alert('Review submitted successfully!');
        } else {
            alert('Error: Review has already been sent.');
        }
    }
});



// NAVIGATION BUTTON - TASK 2
const toggleButton = document.getElementById('toggle-nav');
const menu = document.querySelector('.menu');

toggleButton.addEventListener('click', function () {
    menu.classList.toggle('hidden');
    if (toggleButton.textContent === '>') {
        toggleButton.textContent = '<';
    }
    else {
        toggleButton.textContent = '>';
    }
});



// FEEDBACK - TASK 3
const feedbackInput = document.getElementById('feedback-input');
const submitFeedbackButton = document.getElementById('submit-feedback');
const feedbackMessage = document.getElementById('feedback-message');

submitFeedbackButton.addEventListener('click', function () {
    const userFeedback = feedbackInput.value.trim();

    if (userFeedback.length > 50) {
        return;
    }

    if (userFeedback.toLowerCase().includes('bad')) {
        feedbackMessage.textContent = 'No bad reviews :3';
    } else if (userFeedback) {
        feedbackMessage.textContent = `Your review: "${userFeedback}"`;
    } else {
        feedbackMessage.textContent = 'Please, enter your feedback.';
    }

    feedbackInput.value = '';
});