// TODO: rename js file 
const fetchData = () => {
    fetch(`https://rebrickable.com/api/v3/lego/colors/?key=${process.env.API_KEY}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })
  }
  
  fetchData()