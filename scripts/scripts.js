// Recent projects API fetch

fetch(
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
)
  .then((response) => response.json())
  .then((data) => {
    const result1 = data.filter((data) => data.uuid === "1");
    const result2 = data.filter((data) => data.uuid === "2");
    const result3 = data.filter((data) => data.uuid === "3");

    result1 = JSON.parse(result1);
    result2 = JSON.parse(result2);
    result3 = JSON.parse(result3);

    document.getElementById("API1name").innerHTML = result1.name;
    document.getElementById("API2name").innerHTML = result2.name;
    document.getElementById("API3name").innerHTML = result3.name;

    document.getElementById("API1image").innerHTML = result1.image;
    document.getElementById("API2image").innerHTML = result2.image;
    document.getElementById("API3image").innerHTML = result3.image;

    document.getElementById("API1description").innerHTML = result1.description;
    document.getElementById("API2description").innerHTML = result2.description;
    document.getElementById("API3description").innerHTML = result3.description;
  });
