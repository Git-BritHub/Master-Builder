document.addEventListener("DOMContentLoaded", function () {
    // Get references to the HTML elements
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const favoriteSetsContainer = document.getElementById("favorite-sets");
    const avatarUpload = document.getElementById("avatar-upload");
    const submitButton = document.getElementById("submit-button");
    const profileImage = document.querySelector(".profile-image img");

    // Load saved profile data from localStorage (if available)
    const savedProfileData = JSON.parse(localStorage.getItem("profileData")) || {};

    // Populate the form with saved data (if available)
    usernameInput.value = savedProfileData.username || "";
    emailInput.value = savedProfileData.email || "";

    // Load and display saved avatar image (if available)
    if (savedProfileData.avatar) {
        profileImage.src = savedProfileData.avatar;
    }

    // Populate favorite sets from saved data (if available)
    const savedFavoriteSets = savedProfileData.favoriteSets || [];
    savedFavoriteSets.forEach(function (set) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "favorite-set";
        checkbox.value = set;
        checkbox.checked = true; // Check the checkbox if it's in the saved data

        const label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(set));

        favoriteSetsContainer.appendChild(label);
    });

    // Handle avatar upload (display selected image)
    avatarUpload.addEventListener("change", function () {
        const selectedFile = avatarUpload.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Update the profile image source and save it to localStorage
                profileImage.src = e.target.result;
                savedProfileData.avatar = e.target.result;
                localStorage.setItem("profileData", JSON.stringify(savedProfileData));
                console.log("Avatar updated:", savedProfileData.avatar); // Check if the avatar data is updated
            };
            reader.readAsDataURL(selectedFile);
        }
    });

    // Save profile data when the submit button is clicked
    submitButton.addEventListener("click", function () {
        // Get selected favorite sets
        const favoriteSets = Array.from(document.querySelectorAll('input[name="favorite-set"]:checked'))
            .map((checkbox) => checkbox.value);

        const profileData = {
            username: usernameInput.value,
            email: emailInput.value,
            favoriteSets: favoriteSets,
            avatar: savedProfileData.avatar || "", // Ensure the avatar is saved
        };

        // Save the profile data to localStorage
        localStorage.setItem("profileData", JSON.stringify(profileData));
    });
});