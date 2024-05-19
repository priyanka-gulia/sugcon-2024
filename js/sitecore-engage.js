// Initialize the engage variable
var engage = undefined;

// Create and inject the <script> tag into the HTML
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "https://d1mj578wat5n4o.cloudfront.net/sitecore-engage-v.1.4.2.min.js";
var x = document.querySelector("script");
x.parentNode.insertBefore(s, x);

// Initialize the Engage SDK
s.addEventListener("load", async () => {
  var settings = {
    clientKey: "sndbxus06p9cxhoqoiowkr1sbq5casz3",
    targetURL: "https://api-engage-us.sitecorecloud.io",
    pointOfSale: "SUGCON2024",
    cookieDomain: ".spurious-leather-ricotta.glitch.me",
    cookieExpiryDays: 365,
    forceServerCookieMode: false,
    includeUTMParameters: true,
    webPersonalization: true, //turn personalization on or off
  };
  engage = await window.Engage.init(settings);

  // VIEW event object
  var eventData = {
    channel: "WEB",
    language: "EN",
    currency: "GBP",
    page: "Product",
    pointOfSale: "SUGCON2024",
  };

  // Send a VIEW event
  engage.pageView(eventData);

  // For testing and debugging purposes only
  console.log(
    "Copy-paste the following line into Sitecore CDP > Guests > Search field:"
  );
  console.log("bid:", engage.getBrowserId());
});

async function login(email, firstName, lastName) {
  // Identity event object
  var identityEvent = {
    channel: "WEB",
    language: "EN",
    currency: "USD",
    page: "Home",
    pointOfSale: "SUGCON2024",
    email,
    firstName: firstName,
    lastName: lastName,
    identifiers: [
      {
        id: email,
        provider: "email",
      },
    ],
  };

  // Send a identity event
  await engage.identity(identityEvent);

  document.getElementById("login-form").reset();
  document.getElementById("login-div").classList.add("d-none");
  document.getElementById("login-success-div").classList.remove("d-none");

  //Call Interactive Experience
  const personalizationLoginMsg = {
    channel: "WEB",
    currency: "EUR",
    pointOfSale: "SUGCON2024",
    friendlyId: "sugcon_2024_welcome_new_user",
  };
  const response = await engage.personalize(personalizationLoginMsg);
  $("#newUser").removeClass("d-none");
  $("#newUserGreet").html(
    "Hi, " + response.FirstName + " " + response.LastName
  );
  $("#newUserOffer").html("Use Code NEWEXP at checkout!");
  $(".offcanvas").offcanvas("hide");
}

//function to ADD the product items to the cart and send to CDP
async function sendAddEvent(
  productType,
  itemID,
  productName,
  productPrice,
  productID,
  productCurrency
) {
  // Add event object
  var addEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "SUGCON2024",
    language: "EN",
    page: "homepage",
    product: {
      name: productName,
      type: productType,
      item_id: itemID,
      productId: productID,
      referenceId: productID,
      orderedAt: new Date().toISOString(),
      quantity: 1,
      price: productPrice,
      currency: productCurrency,
    },
  };
  // Send a add event
  await engage.event("ADD", addEvent);
}

//send a CONFIRM event
async function sendConfirmEvent(confirmedProducts) {
  // Confirm event object
  var confirmEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "SUGCON2024",
    language: "EN",
    page: "homepage",
    product: confirmedProducts,
  };
  // Send a Confirm event
  await engage.event("CONFIRM", confirmEvent);
}

//send a CHECKOUT event
async function sendCheckoutEvent() {
  // Confirm event object
  var checkoutEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "SUGCON2024",
    language: "EN",
    page: "homepage",
    reference_id: "ORDER_222",
    status: "PURCHASED",
  };
  // Send a Confirm event
  await engage.event("CHECKOUT", checkoutEvent);
}
