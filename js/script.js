// ===== MODAL =====
function openModal() {
    document.getElementById("enquiryModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("enquiryModal").classList.remove("active");
    document.body.style.overflow = "";
}

function closeModalOutside(event) {
    if (event.target === document.getElementById("enquiryModal")) {
        closeModal();
    }
}

// Close on Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});

// ===== FORM SUBMIT (Google Apps Script) =====
document.getElementById("enquiryForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = "+91 " + document.getElementById("phone").value;
        const time = document.getElementById("time").value;

        fetch("https://script.google.com/macros/s/AKfycbythRugBmR3hStW93ANAbst-oR8VZK5cqFTVNvqkQvDO3qEtP7Q3e2GxK9knICv1J-c/exec", {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                Name: name,
                Email: email,
                Phone: phone,
                Time: time
            })
        })
            .then(function () {
                console.log("Form submitted successfully");
                closeModal();
                document.getElementById("enquiryForm").reset();
                window.location.href = "thankyou/";
            })
            .catch(function (error) {
                console.error("Form submit error:", error);
                alert("Something went wrong. Please try again or contact us directly at franchise@mindmentorz.com");
            })
            .finally(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });