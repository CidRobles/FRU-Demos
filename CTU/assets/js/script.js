window.addEventListener('DOMContentLoaded', function () {
    // Fetch comments
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://ctu-get-donations.cesar-robles.workers.dev/latest", requestOptions)
        .then((response) => response.json())
        .then(function (result) {
            console.log('Results')
            console.log(result)
            if (result.data.comments.length == 0) {
                document.getElementById('notes-container').innerHTML = '<h4>There are no comments yet</h4>'
            } else {
                var count = 0
                result.data.comments.forEach(function (comment) {
                    if (count < 10) {
                        var commentContainer = document.createElement('div')
                        commentContainer.classList.add('note')
                        var commentContent = `<strong>${comment.supporter_first_name} ${comment.supporter_last_name}</strong><p>${comment.comment}</p>`
                        commentContainer.innerHTML = commentContent
                        document.getElementById('notes-container').appendChild(commentContainer)
                        count++
                    }
                })
            }
        })
        .catch((error) => console.error(error));
})