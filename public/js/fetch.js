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
const apiKey = "37b9ea2e840c79115b092a171903cf53"; // Replace with your API key

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

// Function to fetch LEGO sets from the API and populate the results
const fetchSets = async () => {
    const selectedThemeId = themeSelect.value;
    resultsDiv.innerHTML = ""; // Clear previous results

    if (selectedThemeId) {
        try {
            const response = await fetch(`https://rebrickable.com/api/v3/lego/sets/?theme_id=${selectedThemeId}&key=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
                data.results.forEach(async (set) => {
                    const setDiv = document.createElement("div");
                    setDiv.classList.add("set");

                    // Call fetchSetDetails to get the image URL
                    const imageUrl = await fetchSetDetails(set.set_num);

                    // Create an image element for the LEGO set
                    const img = document.createElement("img");
                    img.src = imageUrl || 'URL_TO_DEFAULT_IMAGE'; // Use a default image if URL is not available
                    img.alt = `LEGO Set`;
                    setDiv.appendChild(img);

                    // Create a label with a checkbox for the LEGO set
                    const label = document.createElement("label");
                    label.appendChild(document.createTextNode(`${set.set_num} - ${set.name}`));
                    setDiv.appendChild(label);

                    // Create buttons to add to collection and wishlist
                    const addToCollectionBtn = document.createElement("button");
                    addToCollectionBtn.classList.add("add-to-collection");
                    addToCollectionBtn.textContent = "Add to Collection";
                    addToCollectionBtn.addEventListener("click", () => {
                        // Add set to collection logic here
                        // You can use the set.set_num to identify the set
                    });
                    setDiv.appendChild(addToCollectionBtn);

                    const addToWishlistBtn = document.createElement("button");
                    addToWishlistBtn.classList.add("add-to-wishlist");
                    addToWishlistBtn.textContent = "Add to Wishlist";
                    addToWishlistBtn.addEventListener("click", () => {
                        // Add set to wishlist logic here
                        // You can use the set.set_num to identify the set
                    });
                    setDiv.appendChild(addToWishlistBtn);

                    resultsDiv.appendChild(setDiv);
                });
            } else {
                console.error("Error fetching sets:", data.detail);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

// Event listener to fetch and display LEGO sets when a theme is selected
themeSelect.addEventListener("change", fetchSets);

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