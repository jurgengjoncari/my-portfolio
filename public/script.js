const SUBMIT_BUTTON = document.querySelector('#submit-btn')

async function sendEmail(event) {
    event.preventDefault()
    const FORM = event.target
    SUBMIT_BUTTON.disabled = true

    try {
        const FORM_DATA = new FormData(FORM)
        const FORM_DATA_OBJECT = Object.fromEntries(FORM_DATA)

        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FORM_DATA_OBJECT)
        })

        if (response.ok) {
            SUBMIT_BUTTON.disabled = false
            FORM.reset()
            alert('Email sent successfully!')
        } else {
            throw new Error(`Server responded with status ${response.status}`)
        }
    } catch (error) {
        console.error(error)
        alert('Error sending email. Please try again later.')
    }
}
