const FORM = document.querySelector('form')
const SUBMIT_BUTTON = document.querySelector('#submit-btn')

function submit(event) {
    event.preventDefault()
    SUBMIT_BUTTON.disabled = true

    fetch('/send', {
        method: 'POST',
        body: new FormData(FORM)
    })
    .then((response) => response.text())
    .then((data) => {
        SUBMIT_BUTTON.disabled = false
        FORM.reset()
    })
    .catch((error) => {
        console.error(error)
    })
}