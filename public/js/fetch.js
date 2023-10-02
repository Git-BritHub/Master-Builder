// TODO: Create variables to be used in fetch calls:
// TODO: set id number to delete:
// const list_id = 
// TODO: user name attached to login session:
// const user_token = 


// Fetch call for categories/labels to pull up 10 sets at a time per page
const fetchLabels = () => {
  fetch(`https://rebrickable.com/api/v3/lego/themes/?page_size=10&key=${process.env.API_KEY}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })
}

fetchLabels();

// Fetch call for sets to pull 10 sets at a time per page
const fetchSets = () => {
  fetch(`https://rebrickable.com/api/v3/lego/sets/?page_size=10&key=${process.env.API_KEY}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })
}

fetchSets();

// Fetch call to add set to user wishlist
const addSet = () => {
  fetch(`https://rebrickable.com/api/v3/users/${user_token}/setlists/?key=${process.env.API_KEY}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
  })
}

addSet();

// Fetch call to delete set from user wishlist
const deleteSet = () => {
  fetch(`https://rebrickable.com/api/v3/users/${user_token}/setlists/${list_id}/?key=${process.env.API_KEY}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
  })
}

deleteSet();

// TODO: Write function to browse by label/category, followed by option to browse by sets within chosen label/category -- use fetchLabels() and fetchSets
// TODO: Write function to add sets to user wishlist -- use/edit addSet()
// TODO: Write function to delete sets from user wishlist -- use/edit deleteSet()
// TODO: Write function to add sets to user collection -- use/edit addSet()
// TODO: Write function to delete set from user collection -- use/edit deleteSet()
// TODO: Write function to add stock photo, set name, set ID number, and set price for wish list section and collection section -- use data pulled from fetchSets()