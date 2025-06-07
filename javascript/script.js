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

fetch("http://localhost:3000/public/schools.csv")
  .then((response) => response.text())
  .then((csv) => {
    const lgaToSchools = parseCSV(csv);
    const dropdown = document.getElementById("dropdown");

    Object.keys(lgaToSchools)
      .sort()
      .forEach((lga) => {
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
          schoolList.style.display =
            schoolList.style.display === "block" ? "none" : "block";
        });

        dropdown.appendChild(lgaDiv);
        dropdown.appendChild(schoolList);
      });

    lgea.addEventListener("click", (event) => {
      if (!dropdownOn) {
        dropdownOn = true;
        dropdown.style.display = "block";
        return;
      }
      dropdown.style.display = "none";
      dropdownOn = false;
    });
  });
