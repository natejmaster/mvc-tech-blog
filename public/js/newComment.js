document.addEventListener("DOMContentLoaded", () => {
    const newCommentForm = document.querySelector("#new-comment-form");
  
    newCommentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Get input values
      const text = document.querySelector("#comment-text").value.trim();
      const postId = document.querySelector("#post-id").value;
  
      if (text) {
        // Send a POST request to create a new comment
        const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({ text, postId }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          // Reload the page or do something else on success
          location.reload();
        } else {
          alert("Failed to create a new comment");
        }
      }
    });
  });