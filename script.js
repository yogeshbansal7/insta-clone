// Get DOM elements
const addPostBtn = document.getElementById('add-post-btn');
const postFeed = document.getElementById('post-feed');
const addPostModal = document.getElementById('add-post-modal');
const closeBtn = addPostModal.querySelector('.close');
const postImageInput = document.getElementById('post-image');
const postNameInput = document.getElementById('post-name');
const postCaption = document.getElementById('post-caption');
const postSubmitBtn = document.getElementById('post-submit');

// Create an array to store posts
const posts = [];

// Function to display posts
function displayPosts() {
    postFeed.innerHTML = ''; // Clear the post feed

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <img src="${post.image}" alt="Post Image" class="post-image" />
            <div class="post-info">
                <span class="post-name">${post.name}</span>
                <span class="post-caption">${post.caption}</span>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        postFeed.appendChild(postElement);
    });

    // Attach delete event listeners to each delete button
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deletePost);
    });
}

// Function to add a post
function addPost() {
    const image = postImageInput.files[0];
    const name = postNameInput.value;
    const caption = postCaption.value;

    if (image && name && caption) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            posts.push({ image: imageUrl, name, caption });
            displayPosts();
            postImageInput.value = ''; // Clear the input
            postNameInput.value = ''; // Clear the input
            postCaption.value = '';   // Clear the input
            closeAddPostModal();
        };
        reader.readAsDataURL(image);
    }
}

// Function to delete a post
function deletePost(event) {
    const index = event.target.getAttribute('data-index');
    if (index !== null) {
        posts.splice(index, 1);
        displayPosts();
    }
}

// Function to open the add post modal
function openAddPostModal() {
    addPostModal.style.display = 'block';
}

// Function to close the add post modal
function closeAddPostModal() {
    addPostModal.style.display = 'none';
}

// Attach event listeners
addPostBtn.addEventListener('click', openAddPostModal);
closeBtn.addEventListener('click', closeAddPostModal);
postSubmitBtn.addEventListener('click', addPost);

// Display initial posts
displayPosts();

// Close the modal by default
closeAddPostModal();





