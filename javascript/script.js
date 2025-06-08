function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const result = {};
  for (let i = 1; i < lines.length; i++) {
    const [lga, school] = lines[i].split(",");
    const trimmedLGA = lga.trim();
    const trimmedSchool = school.trim();
    if (!result[trimmedLGA]) {
      result[trimmedLGA] = [];
    }
    result[trimmedLGA].push(trimmedSchool);
  }
  return result;
}

const lgea = document.getElementById("LGEA");
let dropdownOn = false;

fetch("https://usbeb-backend.onrender.com/public/schools.csv")
  .then((response) => response.text())
  .then((csv) => {
    const lgaToSchools = parseCSV(csv);
    const dropdown = document.getElementById("dropdown");

    const lgaContainer = document.createElement("div");
    lgaContainer.className = "lga-container";

    Object.keys(lgaToSchools)
      .sort()
      .forEach((lga) => {
        const group = document.createElement("div");
        group.className = "lga-group";

        const lgaDiv = document.createElement("div");
        lgaDiv.className = "lga";
        lgaDiv.textContent = lga;

        const schoolList = document.createElement("div");
        schoolList.className = "schools";

        lgaToSchools[lga].forEach((school) => {
          const schoolDiv = document.createElement("div");
          schoolDiv.className = "school";
          schoolDiv.textContent = school;
          schoolList.appendChild(schoolDiv);
        });

        lgaDiv.addEventListener("click", () => {
          const isShown = schoolList.style.display === "flex";
          document
            .querySelectorAll(".schools")
            .forEach((el) => (el.style.display = "none"));
          schoolList.style.display = isShown ? "none" : "flex";
        });

        group.appendChild(lgaDiv);
        group.appendChild(schoolList);
        lgaContainer.appendChild(group);
      });

    dropdown.appendChild(lgaContainer);

    lgea.addEventListener("click", () => {
      dropdown.style.display = dropdownOn ? "none" : "block";
      dropdownOn = !dropdownOn;
    });
  });
