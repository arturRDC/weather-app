console.log('js file loaded')

const firstParagraph = document.querySelector('#first-paragraph')
const secondParagraph = document.querySelector('#second-paragraph')

firstParagraph.textContent = ''
secondParagraph.textContent = ''

const weatherForm = document.querySelector('.weather-form')
const addressInput = document.querySelector('#addressInput')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  firstParagraph.textContent = 'Loading...'
  secondParagraph.textContent = ''

  const address = addressInput.value
  const url = '/weather?address=' + address
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstParagraph.textContent = data.error
      } else {
        firstParagraph.textContent = data.location
        secondParagraph.textContent = data.forecast
      }
    })
  })
})
