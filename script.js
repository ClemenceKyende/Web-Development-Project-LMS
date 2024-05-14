document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded"); // Log when DOM content is loaded

    const form = document.getElementById('courseSelectionForm');

    if (form) {
        console.log("Form found"); // Log when form is found
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            console.log("Form submitted"); // Log when form is submitted

            const formData = new FormData(this); 
            const selectedCourses = [];
            formData.forEach((value, key) => {
                if (key === 'course') {
                    selectedCourses.push(value);
                }
            });

            console.log("Selected courses:", selectedCourses); // Log the selected courses

            try {
                const response = await fetch('/select-courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ courses: selectedCourses })
                });

                console.log("Fetch response:", response); // Log the fetch response

                if (response.ok) {
                    alert('Courses selected successfully!');
                } else {
                    alert('Failed to select courses. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error); // Log any errors
            }
        });
    } else {
        console.error("Form with ID 'courseSelectionForm' not found."); // Log if form is not found
    }
});
