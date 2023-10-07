// require('dotenv').config({path:__dirname+'/./../../.env'});

// Other imports and code


// TODO: Create variables to be used in fetch calls:
// TODO: set id number to delete:
// const list_id = 
// TODO: user name attached to login session:
// const user_token = 

// Fetch request for Catalog

const themeSelect = document.getElementById("theme-select");
const resultsDiv = document.querySelector(".results");
const apiKey = "37b9ea2e840c79115b092a171903cf53";
const itemsPerPage = 12;
let currentPage = 1;

// Function to fetch LEGO themes from the API and populate the dropdown
const fetchLabels = () => {
    fetch(`https://rebrickable.com/api/v3/lego/themes/?key=${apiKey}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data && data.results) {
                data.results.forEach((theme) => {
                    const option = document.createElement("option");
                    option.value = theme.id;
                    option.textContent = theme.name;
                    themeSelect.appendChild(option);
                });
            } else {
                console.error("Error fetching themes:", data.detail);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

// Function to fetch LEGO set details including the image URL
const fetchSetDetails = async (setNumber) => {
    try {
        const response = await fetch(`https://rebrickable.com/api/v3/lego/sets/${setNumber}/?key=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            console.log(data)
            // Extract the image URL from the response data
            const imageUrl = data.set_img_url;
            return imageUrl;
        } else {
            console.error("Error fetching set details for set number:", setNumber);
            return null;
        }
    } catch (error) {
        console.error("Error fetching set details:", error);
        return null;
    }
};

// Function to fetch LEGO sets from the API and populate the results for the current page
const fetchSets = async () => {
    const selectedThemeId = themeSelect.value;
    resultsDiv.innerHTML = ""; // Clear previous results

    if (selectedThemeId) {
        try {
            const response = await fetch(`https://rebrickable.com/api/v3/lego/sets/?theme_id=${selectedThemeId}&key=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const setsToDisplay = data.results.slice(startIndex, endIndex);

                setsToDisplay.forEach(async (set) => {
                    // Create a setDiv and set its content as before
                    const setDiv = document.createElement("div");
                    setDiv.classList.add("set");

                    // Create an image element for the LEGO set
                    const img = document.createElement("img");
                    img.src = await fetchSetDetails(set.set_num);
                    img.alt = `LEGO Set`;
                    setDiv.appendChild(img);

                    // Create a label for the LEGO set
                    const label = document.createElement("label");
                    label.textContent = `${set.set_num} - ${set.name}`;
                    setDiv.appendChild(label);

                    // Create buttons to add to collection and wishlist
                    const addToCollectionBtn = document.createElement("button");
                    addToCollectionBtn.classList.add("add-to-collection");
                    addToCollectionBtn.textContent = "Add to Collection";
                    addToCollectionBtn.addEventListener("click", async () => {
                        console.log(set.name)
                        var dataName = set.name
                        var dataNum = set.set_num
                        var dataImg = set.set_img_url
                        const response = await fetch("/api/collection", {
                            method: 'POST',
                            body: JSON.stringify({ dataNum, dataImg, dataName }),
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {
                            // If successful, redirect the browser to the collection page
                            document.location.replace('/collection');
                        } else {
                            alert(response.statusText);
                        }
                    });
                    setDiv.appendChild(addToCollectionBtn);

                    const addToWishlistBtn = document.createElement("button");
                    addToWishlistBtn.classList.add("add-to-wishlist");
                    addToWishlistBtn.textContent = "Add to Wishlist";
                    addToWishlistBtn.addEventListener("click", async () => {
                        console.log(set.name)
                        var dataName = set.name
                        var dataNum = set.set_num
                        var dataImg = set.set_img_url
                        const response = await fetch("/api/wishlist", {
                            method: 'POST',
                            body: JSON.stringify({ dataNum, dataImg, dataName }),
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {
                            // If successful, redirect the browser to the wishlist page
                            document.location.replace('/wishlist');
                        } else {
                            alert(response.statusText);
                        }
                    });
                    setDiv.appendChild(addToWishlistBtn);

                    resultsDiv.appendChild(setDiv);
                });

                updatePaginationInfo(data.results.length);
            } else {
                console.error("Error fetching sets:", data.detail);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

// Function to update pagination information
const updatePaginationInfo = (totalSets) => {
    const totalPages = Math.ceil(totalSets / itemsPerPage);
    const pageInfo = document.getElementById("page-info");
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchSets();
        }
    });

    nextPageButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchSets();
        }
    });
};

// Event listener to fetch and display LEGO sets when a theme is selected or page is changed
themeSelect.addEventListener("change", () => {
    currentPage = 1; // Reset to the first page when the theme is changed
    fetchSets();
});

// Call the function to populate the dropdown with LEGO themes
fetchLabels();

// Fetch call for sets to pull 10 sets at a time per page
// const fetchSets = () => {
//   fetch(`https://rebrickable.com/api/v3/lego/sets/?page_size=10&key=${process.env.API_KEY}`)
//     .then((res) => {
//       return res.json()
//     })
//     .then((data) => {
//       console.log(data)
//     })
// }

// fetchSets();

// // Fetch call to add set to user wishlist
// const addSet = () => {
//   fetch(`https://rebrickable.com/api/v3/users/${user_token}/setlists/?key=${process.env.API_KEY}`)
//   .then((res) => {
//     return res.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
// }

// addSet();

// // Fetch call to delete set from user wishlist
// const deleteSet = () => {
//   fetch(`https://rebrickable.com/api/v3/users/${user_token}/setlists/${list_id}/?key=${process.env.API_KEY}`)
//   .then((res) => {
//     return res.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
// }

// deleteSet();

// TODO: Write function to browse by label/category, followed by option to browse by sets within chosen label/category -- use fetchLabels() and fetchSets
// TODO: Write function to add sets to user wishlist -- use/edit addSet()
// TODO: Write function to delete sets from user wishlist -- use/edit deleteSet()
// TODO: Write function to add sets to user collection -- use/edit addSet()
// TODO: Write function to delete set from user collection -- use/edit deleteSet()
// TODO: Write function to add stock photo, set name, set ID number, and set price for wish list section and collection section -- use data pulled from fetchSets()