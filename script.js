// Sample JSON data (replace this with your actual JSON data)
const jsonData = adversaries;

// Function to display character information
function displayCharacterInfo(data) {
  const characterInfoContainer = document.getElementById("characterInfo");
  characterInfoContainer.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Adjectives:</strong> ${data.adjectives.join(", ")}</p>
    <div class="attribute"> ${data.attributeLevel}</div>
    <p><strong>Stats:</strong></p>
    <ul>
      <li>Endurance: ${data.stats.endurance}</li>
      <li>Might: ${data.stats.might}</li>
      <li>Hate: ${data.stats.hate}</li>
      <li>Parry: ${data.stats.parry}</li>
      <li>Armour: ${data.stats.armour}</li>
    </ul>
    <p><strong>Combat Proficiencies:</strong></p>
    <ul>
      ${
        data.combatProficiencies.length > 0
          ? data.combatProficiencies
              .map(
                (ability) =>
                  `<li>${ability.weapon} (Rating: ${ability.rating}, Damage: ${ability.damage}, Type: ${ability.type})</li>`
              )
              .join("")
          : "<li>No combat proficiencies</li>"
      }
    </ul>
    <p><strong>Fell Abilities:</strong></p>
    <ul>
      ${
        data.fellAbilities.length > 0
          ? data.fellAbilities
              .map((ability) => `<li>${ability.ability}</li>`)
              .join("")
          : "<li>No fell abilities</li>"
      }
    </ul>
  `;
}

// Function to generate the navigation links
function generateNavigation(data) {
  const navigationContainer = document.getElementById("navigation");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  navigationContainer.innerHTML = "<strong>Navigation:</strong>";

  for (let letter of alphabet) {
    const filteredData = data.filter((adversary) =>
      adversary.name.toUpperCase().startsWith(letter)
    );
    if (filteredData.length > 0) {
      navigationContainer.innerHTML += ` <a href="#" onclick="displayAdversaries('${letter}')">${letter}</a>`;
    }
  }
}

// Function to display a list of adversaries
function displayAdversaries(startingLetter) {
  const filteredData = jsonData.filter((adversary) =>
    adversary.name.toUpperCase().startsWith(startingLetter)
  );
  const characterListContainer = document.getElementById("characterList");
  characterListContainer.innerHTML = "<h3>Adversaries:</h3>";
  const nav = document.createElement("nav");

  if (filteredData.length > 0) {
    for (let adversary of filteredData) {
      nav.innerHTML += `<a href="#" onclick="displayCharacterInfo(${JSON.stringify(
        adversary
      ).replace(/"/g, "&quot;")})">${adversary.name}</a>`;
    }
  } else {
    characterListContainer.innerHTML += "<p>No adversaries found.</p>";
  }
  characterListContainer.appendChild(nav);
}

// Function to filter adversaries based on search input
function filterAdversaries() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toUpperCase();
  const filteredData = jsonData.filter((adversary) =>
    adversary.name.toUpperCase().includes(searchInput)
  );
  generateNavigation(filteredData);

  displayAdversaries("");
  displayCharacterInfo(filteredData[0]);
}

// Initial setup
filterAdversaries();
