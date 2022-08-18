async function fetchData() {
    return fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
        .then(response => response.json());
}

function redirectNoContent() {
    window.location.replace(`${getHostname()}/404.html`);
}
function getHostname() {
    // When running on local, hostname may be empty, use pathname instead
    if (window.location.hostname === '') {
        return window.location.href.replace(/\/(project\.html|index\.html).*/, "");
    }
    return window.location.hostname
}

function getProjectIDFromURL() {
    // Check search URL part and extract Project ID
    searchURLMatch = window.location.search.match(/project_id=(\d+)/);

    // If we couldn't obtain the ID, return null to show a 404 error
    if (searchURLMatch === null || searchURLMatch.length < 2) {
        redirectNoContent();
    }

    // Return matching group with search ID
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
    // Shuffle projects randomly
    projects = projects.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    document.querySelectorAll('.projects.projects-wrapper .container').forEach((el, idx) => {
        el.querySelector('img').src = projects[idx].image;
        el.querySelector('h4').textContent = projects[idx].name;
        el.querySelector('p').textContent = projects[idx].description;
        el.querySelector('a').href = `${getHostname()}/project.html?project_id=${projects[idx].uuid}`
    })

}

async function showProjects() {
    // Fetch projects json
    projects = await fetchData();

    // Obtain Project ID from search part from the URL
    mainProjectID = getProjectIDFromURL();

    // Obtain desired Project
    mainProject = projects.filter(project => project.uuid == mainProjectID)?.[0];
    if (mainProject === undefined) {
        redirectNoContent();
    }

    // Print projects
    printMainProject(mainProject);
    printOtherProjects(projects.filter(project => project.uuid != mainProjectID));
}

async function showProjectsIndex() {
    // Fetch projects json
    projects = await fetchData();

    // Print projects
    printOtherProjects(projects);
}



if (window.location.href.match(/project\.html/)) {
    window.addEventListener('load', showProjects);
} else {
    window.addEventListener('load', showProjectsIndex);
}

