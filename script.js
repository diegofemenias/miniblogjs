const postsPerPage = 10; // Number of posts per page
let currentPage = 1;

async function loadPosts() {
    const postContainer = document.getElementById('posts');
    const paginationContainer = document.getElementById('pagination');

    const response = await fetch('posts/posts.json');
    const posts = await response.json();
    const totalPages = Math.ceil(posts.length / postsPerPage);

    function displayPosts(page) {
        postContainer.innerHTML = "";
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.date}</p><p>${post.description}</p>`;
            postContainer.appendChild(postElement);
        });

        updatePaginationButtons(page, totalPages);
    }

    function updatePaginationButtons(page, totalPages) {
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = page === i ? "active" : "";
            button.onclick = () => {
                currentPage = i;
                displayPosts(currentPage);
            };
            paginationContainer.appendChild(button);
        }
    }

    displayPosts(currentPage);
}

loadPosts();
