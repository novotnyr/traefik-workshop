(async () => {
    let url = 'https://jsonplaceholder.typicode.com/users'
    let response = await window.fetch(url, {})
    let body = await response.json()
    let payload = body.map(element => element.name)
        .map(element => "* " + element)
        .join("\n")

    console.log(body)

    document.getElementById("payload").textContent = payload
})();