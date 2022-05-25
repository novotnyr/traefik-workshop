(async () => {
    let url = '/api/v1/greetings'
    let response = await window.fetch(url, {})
    let body = await response.json()
    let payload = body
        .map(element => "* " + element)
        .join("\n")

    console.log(body)

    document.getElementById("payload").textContent = payload
})();