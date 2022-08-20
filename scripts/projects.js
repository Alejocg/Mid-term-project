async function fetchData() {
    return fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
        .then(response => response.json());
}

function hideSpinner() {
    setTimeout(() => [...document.querySelectorAll(".spinner-component")].map(el => el.style.display = "none"), 400);
    
}

function redirectNoContent() {
    window.location.replace(`${getHostname()}/404.html`);
}
function getHostname() {
    if (window.location.hostname === '') {
        return window.location.href.replace(/\/(project\.html|index\.html|404\.html).*/, "");
    }
    return `https://${window.location.hostname}`
}

function getProjectIDFromURL() {
    searchURLMatch = window.location.search.match(/project_id=(\d+)/);

    if (!searchURLMatch || searchURLMatch.length < 2) {
        redirectNoContent();
    }

    return searchURLMatch[1];
}

function printMainProject(project) {
    document.querySelector('#project-article h1').textContent = project.name;

    document.querySelector('#project-article .project-subtitle .body-intro').textContent = project.description;
    document.querySelector('#project-article .project-subtitle .body-intro-light span').textContent = project.completed_on;

    document.querySelector('#project-article .project-image img').src = project.image;

    document.querySelector('#project-article .project-description p').innerHTML = project.content;
}
function printOtherProjects(projects) {
    projects = projects.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    document.querySelectorAll('#projects .card-component').forEach((el, idx) => {
        el.querySelector('.card-image img').src = projects[idx].image;
        el.querySelector('.card-image img').alt = `${projects[idx].name} image`;
        el.querySelector('.card-title').textContent = projects[idx].name;
        el.querySelector('.card-description').textContent = projects[idx].description;
        el.querySelector('.card-link').href = `${getHostname()}/project.html?project_id=${projects[idx].uuid}`
    })


}

async function showProjectsPage() {
    projects = await fetchData();

    mainProjectID = getProjectIDFromURL();

    mainProject = projects.filter(project => project.uuid == mainProjectID)?.[0];
    if (mainProject === undefined) {
        redirectNoContent();
    }

    printMainProject(mainProject);
    printOtherProjects(projects.filter(project => project.uuid != mainProjectID));

    hideSpinner();
}

async function showProjects() {
    projects = await fetchData();

    printOtherProjects(projects);

    hideSpinner();
}



if (window.location.href.match(/project\.html/)) {
    window.addEventListener('load', showProjectsPage);
} else {
    window.addEventListener('load', showProjects);
}

