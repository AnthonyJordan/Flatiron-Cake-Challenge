// your code here

fetch("http://localhost:3000/cakes").then(response => response.json()).then(json => renderCakeNav(json))
document.getElementById("review-form").addEventListener("submit", e => addReview(e))

function renderCakeNav(json) {
    for (const cake of json) {
        const cakeId = cake.id
        const cakeName = cake.name
        const cakeImg = cake.image_url
        const cakeDesc = cake.description
        const reviews = cake.reviews
        const li = document.createElement("li")
        li.setAttribute("cake-id", cakeId)
        li.innerText = cakeName
        li.setAttribute("cake-img", cakeImg)
        li.setAttribute("cake-desc", cakeDesc)
        for (const review of reviews) {
            const p = document.createElement("p")
            p.innerText = review
            p.hidden = true
            li.append(p)
        }
        li.addEventListener("click", e => displayCake(e))

        document.getElementById("cake-list").append(li)
    }
    document.getElementById("cake-list").querySelector("li").click()
}

function displayCake(event) {
    document.getElementById("cake-name").setAttribute("cake-id", event.target.getAttribute("cake-id"))
    document.getElementById("cake-name").innerText = event.target.innerText
    document.getElementById("cake-image").src = event.target.getAttribute("cake-img")
    document.getElementById("cake-description").innerText = event.target.getAttribute("cake-desc")
    const reviewList = document.getElementById("review-list")
    reviewList.innerHTML = ""
    const reviews = event.target.querySelectorAll("p")
    for (const review of reviews) {
        const li = document.createElement("li")
        li.innerText = review.innerText
        li.addEventListener("click", e => removeReview(e))
        reviewList.append(li)
    }
}

function addReview(event) {
    event.preventDefault()
    const newReview = document.getElementById("review").value
    const cakeId = document.getElementById("cake-name").getAttribute("cake-id")
    const reviewArray = createReviewArray(newReview)

    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            reviews: reviewArray


        })
    };

    fetch(`http://localhost:3000/cakes/${cakeId}`, configurationObject).then(response => response.json()).then(json => renderReviews(json))
}


function createReviewArray(newReview) {
    const reviewArray = []
    const reviews = document.getElementById("review-list").querySelectorAll("li")
    for (let i = 0; i < reviews.length; i++) {
        reviewArray.push(reviews[i].innerText)

    }
    reviewArray.push(newReview)
    return reviewArray
}

function renderReviews(json) {
    const reviewList = document.getElementById("review-list")
    reviewList.innerHTML = ""
    const reviews = json.reviews

    for (const review of reviews) {
        const li = document.createElement("li")
        li.innerText = review
        li.addEventListener("click", e => removeReview(e))
        reviewList.append(li)
    }
}

function removeReview(event) {
    event.target.remove()

}