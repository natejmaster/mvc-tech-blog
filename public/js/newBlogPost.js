document.addEventListener("DOMContentLoaded", () => {
    const newBlogPostForm = document.querySelector("#new-blog-post-form");
  
    newBlogPostForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Get input values
      const title = document.querySelector("#post-title").value.trim();
      const content = document.querySelector("#post-content").value.trim();
  
      if (title && content) {
        // Send a POST request to create a new blog post
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          // Redirect to the dashboard or do something else on success
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create a new blog post");
        }
      }
    });
  });
  