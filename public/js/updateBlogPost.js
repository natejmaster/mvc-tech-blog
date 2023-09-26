// Function to handle updating a blog post
const updatePost = async (event) => {
    event.preventDefault();
  
    // Get the post ID from the button's data-id attribute
    const postId = event.target.getAttribute('data-id');
  
    // Fetch the post data (title and content) from your form fields
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    // Send a PUT request to update the blog post with the new data
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Reload the page or update the post on the client-side as needed
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update the blog post.');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // Add an event listener to the "Update" button(s) on the dashboard
  const updateButtons = document.querySelectorAll('.edit-post');
  updateButtons.forEach((button) => {
    button.addEventListener('click', updatePost);
  });