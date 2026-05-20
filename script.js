const form = document.getElementById("regForm");
const payMethod = document.getElementById("payMethod");

payMethod.addEventListener("change", function() {
    const cardSection = document.getElementById("cardSection");
    const upiSection = document.getElementById("upiSection");
    
    cardSection.style.display = (this.value === "card") ? "block" : "none";
    upiSection.style.display = (this.value === "upi") ? "block" : "none";
});

form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.innerHTML = "");
    document.getElementById("successMessage").innerHTML = "";

    const name = document.getElementById("name").value.trim();
    const nameRegex = /^[A-Za-z\s]{3,}$/; 
    if (!nameRegex.test(name)) {
        document.getElementById("errorName").innerHTML = "Name must contain only letters and be at least 3 characters long.";
        isValid = false;
    }

    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").innerHTML = "Please enter a valid email address.";
        isValid = false;
    }

    const mobile = document.getElementById("mobile").value.trim();
    const mobileRegex = /^[7-9]\d{9}$/; 
    if (!mobileRegex.test(mobile)) {
        document.getElementById("errorMobile").innerHTML = "Mobile number must be 10 digits starting with 7, 8, or 9.";
        isValid = false;
    }

    const dobInput = document.getElementById("dob").value;
    if (!dobInput) {
        document.getElementById("errorDob").innerHTML = "Please select a date of birth.";
        isValid = false;
    } else {
        const dob = new Date(dobInput);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age <= 18 || age >= 25) {
            document.getElementById("errorDob").innerHTML = "Age must be between 18 and 25 years.";
            isValid = false;
        }
    }

    const marksX = document.getElementById("marksX").value.trim();
    const marksXII = document.getElementById("marksXII").value.trim();

    if (marksX === "") {
        document.getElementById("errorX").innerHTML = "X marks are mandatory.";
        isValid = false;
    }
    if (marksXII === "") {
        document.getElementById("errorXII").innerHTML = "XII marks are mandatory.";
        isValid = false;
    }

    const method = payMethod.value;
    if (method === "") {
        document.getElementById("errorPay").innerHTML = "Please select a payment method.";
        isValid = false;
    } else if (method === "card") {
        const cardNo = document.getElementById("cardNo").value.trim();
        const cardRegex = /^\d{16}$/;
        if (!cardRegex.test(cardNo)) {
            document.getElementById("errorPay").innerHTML = "Enter a valid 16-digit card number.";
            isValid = false;
        }
    } else if (method === "upi") {
        const upiId = document.getElementById("upiId").value.trim();
        const upiRegex = /^[\w.-]+@[\w.-]+$/; 
        if (!upiRegex.test(upiId)) {
            document.getElementById("errorPay").innerHTML = "Enter a valid UPI ID (e.g., name@bank).";
            isValid = false;
        }
    }

    if (isValid) {
        document.getElementById("successMessage").innerHTML = "Registration Successful!";
        form.reset(); 
      
        document.getElementById("cardSection").style.display = "none";
        document.getElementById("upiSection").style.display = "none";
    }
});