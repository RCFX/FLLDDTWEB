// Add functionality to the "Learn More" button
document.getElementById("moreInfo").addEventListener("click", () => {
    alert(
        "For more details about DDT:\n" +
        "- Visit: https://www.epa.gov\n" +
        "- Read Rachel Carson's book 'Silent Spring'\n" +
        "- Explore local environmental protection groups."
    );
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forumForm");
    const forumPosts = document.getElementById("forumPosts");

    // Load existing posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    storedPosts.forEach((post) => displayPost(post));

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get user input
        const username = document.getElementById("username").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (username && comment) {
            const post = { username, comment, time: new Date().toLocaleString() };

            // Display the post
            displayPost(post);

            // Save to localStorage
            storedPosts.push(post);
            localStorage.setItem("forumPosts", JSON.stringify(storedPosts));

            // Clear form fields
            form.reset();
        }
    });

    function displayPost(post) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <p><strong>${post.username}</strong> <em>(${post.time})</em></p>
            <p>${post.comment}</p>
            <hr>
        `;

        forumPosts.appendChild(postDiv);
    }
});
