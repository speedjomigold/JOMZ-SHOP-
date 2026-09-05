let selectedPackage = "";
let selectedPrice = "";

let orderCreated = false;
let notificationShown = false;

// ==========================================
// CLEAR COMPLETED ORDER
// ==========================================

function clearCompletedOrder() {

localStorage.removeItem("jomzSelectedPackage");
localStorage.removeItem("jomzSelectedPrice");
localStorage.removeItem("jomzPlayerID");
localStorage.removeItem("jomzOrderId");
localStorage.removeItem("topupCompletedShown");

selectedPackage = "";
selectedPrice = "";
orderCreated = false;
notificationShown = false;


const playerID =
    document.getElementById("playerID");

if (playerID) {

    playerID.value = "";

}


const displayID =
    document.getElementById("displayID");

if (displayID) {

    displayID.textContent =
        "Not entered";

}


const displayPackage =
    document.getElementById(
        "displayPackage"
    );

if (displayPackage) {

    displayPackage.textContent =
        "Not selected";

}


const displayPrice =
    document.getElementById(
        "displayPrice"
    );

if (displayPrice) {

    displayPrice.textContent =
        "₦0";

}


const payButton =
    document.getElementById(
        "payButton"
    );

if (payButton) {

    payButton.style.display =
        "none";

}


const paymentBox =
    document.getElementById(
        "paymentBox"
    );

if (paymentBox) {

    paymentBox.style.display =
        "none";

}

}

// ==========================================
// RESTORE CUSTOMER DATA
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function () {

    const savedPackage =
        localStorage.getItem(
            "jomzSelectedPackage"
        );

    const savedPrice =
        localStorage.getItem(
            "jomzSelectedPrice"
        );

    const savedPlayerID =
        localStorage.getItem(
            "jomzPlayerID"
        );

    const savedOrderID =
        localStorage.getItem(
            "jomzOrderId"
        );


    if (
        savedPackage &&
        savedPrice
    ) {

        selectedPackage =
            savedPackage;

        selectedPrice =
            savedPrice;


        const displayPackage =
            document.getElementById(
                "displayPackage"
            );

        const displayPrice =
            document.getElementById(
                "displayPrice"
            );


        if (displayPackage) {

            displayPackage.textContent =
                savedPackage;

        }


        if (displayPrice) {

            displayPrice.textContent =
                savedPrice;

        }


        document.querySelectorAll(
            ".package"
        ).forEach(item => {

            item.classList.remove(
                "selected"
            );

            const itemText =
                item.textContent || "";

            if (
                itemText.includes(
                    savedPackage
                )
            ) {

                item.classList.add(
                    "selected"
                );

            }

        });

    }


    if (savedPlayerID) {

        const playerID =
            document.getElementById(
                "playerID"
            );

        const displayID =
            document.getElementById(
                "displayID"
            );


        if (playerID) {

            playerID.value =
                savedPlayerID;

        }


        if (displayID) {

            displayID.textContent =
                savedPlayerID;

        }

    }


    if (savedOrderID) {

        orderCreated = true;


        const payButton =
            document.getElementById(
                "payButton"
            );


        if (payButton) {

            payButton.style.display =
                "inline-block";

        }


        checkOrderStatus();

    }

}

);

// ==========================================
// SELECT PACKAGE
// ==========================================

function selectPackage(
element,
packageName,
price
) {

document.querySelectorAll(
    ".package"
).forEach(item => {

    item.classList.remove(
        "selected"
    );

});


if (element) {

    element.classList.add(
        "selected"
    );

}


selectedPackage =
    packageName;

selectedPrice =
    price;


localStorage.setItem(
    "jomzSelectedPackage",
    packageName
);


localStorage.setItem(
    "jomzSelectedPrice",
    price
);


localStorage.removeItem(
    "topupCompletedShown"
);


const displayPackage =
    document.getElementById(
        "displayPackage"
    );

const displayPrice =
    document.getElementById(
        "displayPrice"
    );


if (displayPackage) {

    displayPackage.textContent =
        packageName;

}


if (displayPrice) {

    displayPrice.textContent =
        price;

}

}

// ==========================================
// PLAYER ID
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function () {

    const playerID =
        document.getElementById(
            "playerID"
        );


    if (playerID) {

        playerID.addEventListener(
            "input",
            function () {

                const displayID =
                    document.getElementById(
                        "displayID"
                    );


                if (displayID) {

                    displayID.textContent =
                        this.value ||
                        "Not entered";

                }


                localStorage.setItem(
                    "jomzPlayerID",
                    this.value
                );

            }
        );

    }

}

);

// ==========================================
// SCROLL TO TOP UP
// ==========================================

function scrollToTopUp() {

const topup =
    document.getElementById(
        "topup"
    );


if (topup) {

    topup.scrollIntoView({

        behavior:
            "smooth"

    });

}

}
// ==========================================
// SHOW ORDER CONFIRMATION
// ==========================================

function placeOrder() {

    // Check if JOMZ SHOP is open
    if (!isPaymentActive()) {

        const payButton =
            document.getElementById("payButton");

        if (payButton) {
            payButton.style.display = "none";
        }

        showOrderClosedPopup();

        return;
    }


    const playerIDElement =
        document.getElementById("playerID");


    const playerID =
        playerIDElement.value.trim();


    if (!playerID) {

        alert(
            "Please enter your Free Fire Player ID."
        );

        return;

    }


    if (!selectedPackage) {

        alert(
            "Please select a diamond package."
        );

        return;

    }


    const details =
        document.getElementById(
            "orderConfirmDetails"
        );


    if (details) {

        details.innerHTML =
            "<p><strong>Player ID:</strong> " +
            playerID +
            "</p>" +

            "<p><strong>Package:</strong> " +
            selectedPackage +
            "</p>" +

            "<p><strong>Price:</strong> ₦" +
            selectedPrice +
            "</p>";

    }


    const popup =
        document.getElementById(
            "orderConfirmPopup"
        );


    if (popup) {

        popup.style.display = "flex";

    }

}


// ==========================================
// CLOSE CONFIRMATION POPUP
// ==========================================

function closeOrderConfirmPopup() {

    const popup =
        document.getElementById(
            "orderConfirmPopup"
        );

    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================================
// CONFIRM ORDER
// ==========================================

function confirmOrder() {

    closeOrderConfirmPopup();

    submitOrder();

}

// ==========================================
// PLACE ORDER
// ==========================================

function submitOrder() {

    const payButton =
    document.getElementById("payButton");

if (payButton) {
    payButton.style.display = "none";
}
    // Check payment/order opening hours first
    if (!isPaymentActive()) {
        showOrderClosedPopup();
        return;
    }


    const playerIDElement =
        document.getElementById(
            "playerID"
        );


    if (!playerIDElement) {

        alert(
            "Player ID field not found."
        );

        return;

    }


    const playerID =
        playerIDElement.value.trim();


    if (!playerID) {

        alert(
            "Please enter your Free Fire Player ID."
        );

        return;

    }


    if (!selectedPackage) {

        alert(
            "Please select a diamond package."
        );

        return;

    }


    localStorage.setItem(
        "jomzPlayerID",
        playerID
    );


    fetch(
        "/api/orders",
        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                name:
                    playerID,

                product:
                    selectedPackage,

                quantity:
                    1,

                price:
                    selectedPrice

            })

        }
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Server error"
            );

        }

        return response.json();

    })

    .then(data => {

        if (data.success) {

            localStorage.setItem(
                "jomzOrderId",
                data.orderId
            );


            orderCreated = true;

            notificationShown = false;


            const payButton =
                document.getElementById(
                    "payButton"
                );


            if (payButton) {

                payButton.style.display =
                    "inline-block";

            }


            alert(
                "Order received successfully!\n\n" +
                "Order ID: " +
                data.orderId +
                "\nStatus: Pending"
            );


            checkOrderStatus();

        }

        else {

            alert(
                data.message ||
                "Could not create order."
            );

        }

    })

    .catch(error => {

        console.error(error);

        alert(
            "Could not connect to the JOMZ SHOP server."
        );

    });

}

// ==========================================
// CHECK ORDER STATUS
// ==========================================

function checkOrderStatus() {

const orderId =
    localStorage.getItem(
        "jomzOrderId"
    );


if (!orderId) {

    return;

}


fetch(
    "/api/order-status/" +
    orderId
)

.then(response => {

    if (!response.ok) {

        throw new Error(
            "Status request failed"
        );

    }

    return response.json();

})

.then(data => {

    if (!data.success) {

        return;

    }


    if (
        data.status ===
        "Completed"
    ) {

        handleCompletedOrder(
            orderId
        );

        return;

    }


    showOrderStatus(
        data.status
    );

})

.catch(error => {

    console.log(
        "Could not check order status."
    );

});

}

// ==========================================
// HANDLE COMPLETED ORDER
// ==========================================

function handleCompletedOrder(
completedOrderId
) {

if (!completedOrderId) {

    completedOrderId =
        localStorage.getItem(
            "jomzOrderId"
        );

}


// Save completed order ID
if (completedOrderId) {

    localStorage.setItem(
        "jomzCompletedOrderId",
        completedOrderId
    );

}


showOrderStatus(
    "Completed"
);


if (
    !localStorage.getItem(
        "topupCompletedShown"
    )
) {

    // IMPORTANT:
    // Clear first, then save this flag
    clearCompletedOrder();


    localStorage.setItem(
        "topupCompletedShown",
        "true"
    );


    showJomzPopup(
        "🎉 TOP-UP COMPLETED!",
        "Your Free Fire diamonds have been successfully added to your account. Thank you for shopping with JOMZ SHOP! ❤️"
    );

}

}

// ==========================================
// SHOW ORDER STATUS
// ==========================================

function showOrderStatus(status) {

let statusBox =
    document.getElementById(
        "orderStatus"
    );


if (!statusBox) {

    statusBox =
        document.createElement(
            "div"
        );


    statusBox.id =
        "orderStatus";


    statusBox.style.marginTop =
        "20px";

    statusBox.style.padding =
        "15px";

    statusBox.style.textAlign =
        "center";

    statusBox.style.fontSize =
        "18px";

    statusBox.style.borderRadius =
        "10px";


    const summary =
        document.querySelector(
            ".summary"
        );


    if (summary) {

        summary.appendChild(
            statusBox
        );

    }

}


if (!statusBox) {

    return;

}


if (status === "Completed") {

    statusBox.innerHTML =
        "🟢 <b>Top-Up Completed!</b>" +
        "<br><br>" +
        "<button onclick=\"openReceipt()\" " +
        "style=\"padding:12px 18px;" +
        "border:none;" +
        "border-radius:8px;" +
        "cursor:pointer;" +
        "font-weight:bold;\">" +
        "🧾 View / Download Receipt" +
        "</button>";

}

else if (status === "Pending") {

    statusBox.innerHTML =
        "🟡 <b>Top-Up Pending...</b>";

}

else {

    statusBox.innerHTML =
        "🟡 <b>Status: " +
        status +
        "</b>";

}

}

// ==========================================
// PAY NOW
// ==========================================

function startPayment() {

const orderId =
    localStorage.getItem(
        "jomzOrderId"
    );


if (!orderId) {

    alert(
        "Please place an order first."
    );

    return;

}


const paymentBox =
    document.getElementById(
        "paymentBox"
    );


if (paymentBox) {

    paymentBox.style.display =
        "block";

}

}

// ==========================================
// PAYMENT NOTIFICATION
// ==========================================

function confirmTransfer() {

const orderId =
    localStorage.getItem(
        "jomzOrderId"
    );


if (!orderId) {

    alert(
        "Please place an order first."
    );

    return;

}


fetch(
    "/api/orders/" +
    orderId +
    "/payment",
    {

        method:
            "PUT",

        headers: {

            "Content-Type":
                "application/json"

        }

    }
)

.then(response => {

    if (!response.ok) {

        throw new Error(
            "Payment notification failed"
        );

    }

    return response.json();

})

.then(data => {

    if (data.success) {

        alert(
            "Payment notification sent successfully!\n\n" +
            "Your payment will be checked manually."
        );


        checkOrderStatus();

    }

    else {

        alert(
            data.message ||
            "Could not send payment notification."
        );

    }

})

.catch(error => {

    console.error(error);

    alert(
        "Could not send payment notification."
    );

});

}

// ==========================================
// COPY ACCOUNT NUMBER
// ==========================================

function copyAccountNumber() {

const accountNumber =
    document.getElementById(
        "accountNumber"
    );


if (!accountNumber) {

    alert(
        "Account number not found."
    );

    return;

}


navigator.clipboard.writeText(
    accountNumber.textContent.trim()
)

.then(() => {

    alert(
        "Account number copied!"
    );

})

.catch(() => {

    alert(
        "Could not copy account number."
    );

});

}

// ==========================================
// AUTOMATIC STATUS CHECK
// ==========================================

function checkPaymentConfirmation() {

if (!orderCreated) {

    return;

}


const orderId =
    localStorage.getItem(
        "jomzOrderId"
    );


if (!orderId) {

    return;

}


fetch(
    "/api/order-status/" +
    orderId
)

.then(response => {

    if (!response.ok) {

        throw new Error(
            "Status check failed"
        );

    }

    return response.json();

})

.then(data => {

    if (!data.success) {

        return;

    }

// ==========================================
// CUSTOMER NOTIFICATION
// ==========================================

if (data.notification) {

    const notificationKey =
        "jomzNotification_" + orderId;

    const alreadyShown =
        localStorage.getItem(notificationKey);

    if (alreadyShown !== data.notification) {

        showJomzPopup(
            "📢 JOMZ SHOP UPDATE",
            data.notification
        );

        localStorage.setItem(
            notificationKey,
            data.notification
        );

    }

}

    // ORDER COMPLETED

    if (

        data.status ===
        "Completed"

    ) {

        handleCompletedOrder(
            orderId
        );

    }

    else {

        showOrderStatus(
            data.status
        );

    }

})

.catch(error => {

    console.log(
        "Unable to check order status."
    );

});

}

// ==========================================
// CHECK EVERY 5 SECONDS
// ==========================================

setInterval(

checkPaymentConfirmation,

5000

);

// ==========================================
// OPEN RECEIPT
// ==========================================

function openReceipt() {

const orderId =
    localStorage.getItem(
        "jomzCompletedOrderId"
    );


if (!orderId) {

    alert(
        "Completed order receipt not found."
    );

    return;

}


window.location.href =
    "receipt.html?id=" +
    encodeURIComponent(
        orderId
    );

}

// ==========================================
// JOMZ SHOP CUSTOM POPUP
// ==========================================

function showJomzPopup(
title,
message
) {

const popup =
    document.getElementById(
        "jomzPopup"
    );

const popupTitle =
    document.getElementById(
        "jomzPopupTitle"
    );

const popupMessage =
    document.getElementById(
        "jomzPopupMessage"
    );


if (

    !popup ||

    !popupTitle ||

    !popupMessage

) {

    return;

}


popupTitle.textContent =
    title;

popupMessage.textContent =
    message;


popup.style.display =
    "flex";

}

// ==========================================
// CLOSE JOMZ POPUP
// ==========================================

function closeJomzPopup() {

const popup =
    document.getElementById(
        "jomzPopup"
    );


if (popup) {

    popup.style.display =
        "none";

}

}



// =================================
// ACTIVE NAVIGATION
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navLinks =
            document.querySelectorAll("nav a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        });

    }
);

// =================================
// AUTOMATIC ACTIVE NAVIGATION
// =================================

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    let currentSection = "";

    const scrollPosition =
        window.scrollY +
        window.innerHeight / 2;


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// RUN ONCE WHEN PAGE LOADS

window.dispatchEvent(
    new Event("scroll")
);


// =================================
// SCROLL REVEAL ANIMATION
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        function revealOnScroll() {

            revealElements.forEach(
                function (element) {

                    const position =
                        element.getBoundingClientRect();

                    const screenHeight =
                        window.innerHeight;


                    if (
                        position.top <
                        screenHeight - 80
                    ) {

                        element.classList.add(
                            "show"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            revealOnScroll
        );


        revealOnScroll();

    }
);

// =================================
// JOMZ SCROLL TO TOP
// =================================

const scrollTopBtn =
    document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }

});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// JOMZ SHOP LOADING + PAYMENT SCHEDULE

document.addEventListener("DOMContentLoaded", function () {

    const loader =
        document.getElementById("jomzLoader");

    const paymentPopup =
        document.getElementById(
            "paymentSchedulePopup"
        );

    if (!loader) {
        console.log(
            "JOMZ LOADER NOT FOUND"
        );
        return;
    }

    console.log(
        "JOMZ LOADER FOUND"
    );


    setTimeout(function () {

        // Hide the loader
        loader.classList.add("hide");
        
        setTimeout(() => {
    const popup =
        document.getElementById("paymentSchedulePopup");

    if (popup) {
        popup.style.display = "flex";
    }
}, 500);


        // Show payment schedule
        // immediately after loader finishes
        if (paymentPopup) {

            paymentPopup.style.display =
                "flex";

        }

    }, 3000);

});


// ===============================
// JOMZ SHOP PAYMENT SCHEDULE
// ===============================

function isPaymentActive() {
    const now = new Date();

    // Nigeria time (WAT)
    const nigeriaTime = new Date(
        now.toLocaleString("en-US", {
            timeZone: "Africa/Lagos"
        })
    );

    const day = nigeriaTime.getDay();
    const hour = nigeriaTime.getHours();

    // Sunday = 0
    // Monday = 1
    // Saturday = 6

    // Monday - Saturday, 9 AM - 5 PM
    return day >= 1 && day <= 6 && hour >= 9 && hour < 17;
}





// ===============================
// CLOSE PAYMENT POPUP
// ===============================

function closePaymentPopup() {
    const popup =
        document.getElementById("paymentSchedulePopup");

    if (popup) {
        popup.style.display = "none";
    }
}


// ===============================
// SHOW ORDER CLOSED POPUP
// ===============================

function showOrderClosedPopup() {

    const popup =
        document.getElementById(
            "orderClosedPopup"
        );

    const message =
        document.getElementById(
            "orderClosedMessage"
        );

    if (!popup || !message) return;


    const now = new Date();

    const nigeriaTime =
        new Date(
            now.toLocaleString(
                "en-US",
                {
                    timeZone:
                        "Africa/Lagos"
                }
            )
        );


    const day =
        nigeriaTime.getDay();

    const hour =
        nigeriaTime.getHours();


    let nextOpening;


    // Monday - Friday before 9 AM
    if (
        day >= 1 &&
        day <= 5 &&
        hour < 9
    ) {

        nextOpening =
            "today at 9:00 AM";

    }

    // Monday - Friday after 5 PM
    else if (
        day >= 1 &&
        day <= 5 &&
        hour >= 17
    ) {

        nextOpening =
            "tomorrow at 9:00 AM";

    }

    // Saturday before 9 AM
    else if (
        day === 6 &&
        hour < 9
    ) {

        nextOpening =
            "today at 9:00 AM";

    }

    // Saturday after 5 PM
    else if (
        day === 6 &&
        hour >= 17
    ) {

        nextOpening =
            "Monday at 9:00 AM";

    }

    // Sunday
    else {

        nextOpening =
            "Monday at 9:00 AM";

    }


    message.innerHTML =
        "Orders are currently closed.<br><br>" +
        "Payment is active Monday – Saturday, " +
        "9:00 AM – 5:00 PM.<br><br>" +
        "<strong>Next available: " +
        nextOpening +
        ".</strong>";


    popup.style.display =
        "flex";
}

// ===============================
// CLOSE ORDER CLOSED POPUP
// ===============================

function closeOrderClosedPopup() {

    const popup =
        document.getElementById("orderClosedPopup");

    if (popup) {
        popup.style.display = "none";
    }
}

// ==========================================
// SHOW PAYMENT SCHEDULE AFTER LOADER
// ==========================================

function showPaymentScheduleAfterLoader() {

    const popup =
        document.getElementById(
            "paymentSchedulePopup"
        );

    if (popup) {
        popup.style.display = "flex";
    }
}