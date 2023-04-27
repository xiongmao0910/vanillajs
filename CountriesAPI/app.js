// Variables
let darkModeBtn = document.querySelector("#darkModeBtn");
let countriesInput = document.querySelector("#countriesInput");
let countriesFilterBtn = document.querySelector("#countriesFilterBtn");
let countriesList = document.querySelector("#countriesList");
let regionDOM = document.querySelector(".countries--region");

let COUNTRIES_API = "https://restcountries.com/v3.1/all";
let countries;

let isLoaded = false;

// Function
async function init() {
    getTheme();

    if (!isLoaded) {
        countriesList.innerHTML = `
            <p style="font-weight: 800;">Loading data...</p>
        `;
    }

    countries = await getAllCountries();
    showCountries(countries);
}

function getTheme() {
    if (!localStorage.getItem("darkMode")) {
        localStorage.setItem("darkMode", "light");
    }

    let modeTheme = localStorage.getItem("darkMode");
    document.documentElement.setAttribute("data-theme", modeTheme);
}

function getAllCountries() {
    let result = fetch(COUNTRIES_API)
        .then((res) => res.json())
        .then((data) => data);
    return result;
}

function showCountries(countries) {
    if (countries) isLoaded = true;

    if (isLoaded) {
        countriesList.innerHTML = ``;

        countries.map((country) => {
            countriesList.appendChild(Country(country));
        });
    }
}

function switchTheme() {
    let modeTheme = localStorage.getItem("darkMode");

    if (modeTheme === "light") {
        modeTheme = "dark";
    } else {
        modeTheme = "light";
    }

    localStorage.setItem("darkMode", modeTheme);
    document.documentElement.setAttribute("data-theme", modeTheme);
}

function showRegionSelect() {
    let isExpand =
        regionDOM.getAttribute("data-expand") === "false" ? "true" : "false";
    regionDOM.setAttribute("data-expand", isExpand);
}

function Country(country) {
    let countryBox = document.createElement("div");
    countryBox.classList.add("country--box");
    countryBox.innerHTML = `
        <img
            class="country--image"
            src="${country.flags.png}"
            alt=""
        />
        <div class="country--content">
            <h4 class="country--name">${country.name.common}</h4>
            <p class="country--population">
                <span>population:</span>
                ${country.population}
            </p>
            <p class="country--region">
                <span>region:</span>
                ${country.region}
            </p>
            <p class="country--capital">
                <span>capital:</span>
                ${country.capital}
            </p>
        </div>
    `;

    return countryBox;
}

// Event
document.addEventListener("DOMContentLoaded", init);

darkModeBtn.addEventListener("click", () => {
    switchTheme();
});

countriesInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
        showCountries(countries);
        return;
    }

    let countriesFilter = [...countries].filter(function (country) {
        return country.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
    });

    if (countriesFilter.length <= 0) {
        countriesList.innerHTML = `
            <p style="font-weight: 800;">No country</p>
        `;

        return;
    }

    showCountries(countriesFilter);
});

countriesFilterBtn.addEventListener("click", () => {
    showRegionSelect();
});

regionDOM.querySelectorAll(".countries--select li").forEach((item) => {
    item.addEventListener("click", function () {
        regionDOM.setAttribute("data-expand", "false");
        let filterCondition = this.innerText;

        let countriesFilter =
            filterCondition === "All"
                ? [...countries]
                : [...countries].filter(function (country) {
                      return country.region === filterCondition;
                  });

        showCountries(countriesFilter);
    });
});
