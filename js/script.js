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

// ===== FORM SUBMIT (SMTP) =====
document.getElementById("enquiryForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = "+91 " + document.getElementById("phone").value;
        const time = document.getElementById("time").value;

        const body = "Name: " + name + "<br>" +
            "Email: " + email + "<br>" +
            "Phone: " + phone + "<br>" +
            "Preferred Time to Call: " + time;

        try {
            Email.send({
                Host: "smtp.gmail.com",
                Username: "noreply@mindmentorz.com",
                Password: "shoh ntun mgvl hzzj",
                To: "noreply@mindmentorz.com",
                From: "noreply@mindmentorz.com",
                Subject: "Franchise Enquiry from " + name,
                Body: body
            }).then(function (message) {
                console.log("Email status: " + message);
            });
        } catch (err) {
            console.error("Email send error:", err);
        }

        // Always navigate to thank you page
        closeModal();
        document.getElementById("enquiryForm").reset();
        setTimeout(function () {
            window.location.href = "thankyou/";
        }, 500);
    });