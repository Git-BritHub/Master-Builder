const fetchUserProfile = async (username) => {
    try {
        const response = await fetch(`/profile/${username}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        // Handle the user data, e.g., update the DOM with the user's information
        console.log(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

// Function to extract the username from the URL
const getUsernameFromURL = () => {
    const pathArray = window.location.pathname.split('/');
    return pathArray[pathArray.length - 1];
};

// Run the fetchUserProfile function on page load
window.addEventListener('load', () => {
    const username = getUsernameFromURL();
    fetchUserProfile(username);
});