// Function to handle deleting a blog post
const deletePost = async (event) => {
    event.preventDefault();
  
    // Get the post ID from the button's data-id attribute
    const postId = event.target.getAttribute('data-id');
  
    // Send a DELETE request to remove the blog post
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Reload the page or remove the post from the client-side as needed
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete the blog post.');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // Add an event listener to the "Delete" button(s) on the dashboard
  const deleteButtons = document.querySelectorAll('.delete-post');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deletePost);
  });