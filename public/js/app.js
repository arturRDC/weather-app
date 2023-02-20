console.log('js file loaded')

const weatherForm = document.querySelector('.weather-form')
const addressInput = document.querySelector('#addressInput')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const address = addressInput.value
  const url = '/weather?address=' + address
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data.location)
        console.log(data.forecast)
      }
    })
  })
})
