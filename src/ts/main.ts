import "./../scss/style.scss";
import { closePage, openPage, stopScroll, validateForm } from "./functions";
import { Product } from "./models/Product";

const products = [
  new Product(
    "Rödgran",
    "./assets/media/resized_images/red_spruce3.webp",
    "230 – 260 cm",
    499,
    "Rödgranen, en symbol för julens stämning, är känd för sina stadiga grenar och doftande barr som sprider en friskhet som förtrollar. Med dess frodiga barrverk och praktfulla utseende blir denna gran ett lysande inslag i juldekorationerna. Med rätt underhåll sitter barren kvar länge och ger en varaktig skönhet som fyller hemmet med en känsla av tradition och glädje under helgerna.",
    "001"
  ),
  new Product(
    "Rödgran",
    "./assets/media/resized_images/red_spruce.webp",
    "180 – 230 cm",
    350,
    "Inget fångar julens anda som den klassiska rödgranen. Dess slanka silhuett och intensiva gröna barr skapar en fantastisk atmosfär och sprider en ljuvlig doft i varje vrå. Rödgranen är mer än en dekoration – den är själva hjärtat i julens festligheter och bjuder in till en tid av gemenskap och värme.",
    "002"
  ),
  new Product(
    "Blågran",
    "./assets/media/resized_images/blue_spruce.webp",
    "180 – 230 cm",
    699,
    "Blågranen är en storslagen symbol för vinterns charm och elegans. Med sina mjuka, silverblå barr skapar denna gran en atmosfär av frostig skönhet i varje rum. Dess kompakta och välmående grenverk ger en perfekt plats att hänga julens dekorationer och ljus, medan dess hållbara barr behåller sin färg och form under hela säsongen. Blågranen erbjuder en unik och förtrollande touch till julens firande och blir snabbt hjärtat i ditt hem under denna festliga tid.",
    "003"
  ),
  new Product(
    "Bosnisk tall",
    "./assets/media/resized_images/bosnian_pine.webp",
    "180 – 230 cm",
    750,
    "Bosnisk tall, med sin ståtliga och majestätiska gestalt, är en symbol för vinterens skönhet och styrka. Dess karaktäristiska mörkgröna barr och robusta grenar skapar en imponerande kuliss för julens festligheter. Med en naturlig symmetri och en doft av skogens friskhet blir denna tall en enastående centralpunkt för dekorationer och ljus. Dess hållbara kvalitet och långvariga skönhet gör den till det perfekta valet för att införa en känsla av tradition och elegans i ditt hem under julen.",
    "004"
  ),
  new Product(
    "Rödgran",
    "./assets/media/resized_images/red_spruce2.webp",
    "100 – 140 cm",
    250,
    "Rödgranen är julens symbol av skönhet och elegans. Dess frodiga barrverk skänker inte bara en frisk doft utan också en levande touch till varje hem. Med en rödgran i huset skapas en atmosfär av tradition och fröjd, där varje barrstrå förmedlar känslan av en härlig julstund.",
    "005"
  ),
  new Product(
    "Rödgran",
    "./assets/media/resized_images/red_spruce_xl.webp",
    "300 – 350 cm",
    990,
    "Inget fångar julens anda som den klassiska rödgranen. Dess slanka silhuett och intensiva gröna barr skapar en fantastisk atmosfär och sprider en ljuvlig doft i varje vrå. Rödgranen är mer än en dekoration – den är själva hjärtat i julens festligheter och bjuder in till en tid av gemenskap och värme.",
    "006"
  ),
];

const cart: Product[] = JSON.parse(
  sessionStorage.getItem("cartItems") || JSON.stringify([])
);

// CTA scrollar till produkterna
const ctaButton = document.getElementById("cta");
ctaButton?.addEventListener("click", () => {
  const productList = document.getElementById("product-list");

  productList?.scrollIntoView({ behavior: "smooth" });
});

let totalPrice: number = 0;
totalPrice = JSON.parse(
  sessionStorage.getItem("totalPrice") || JSON.stringify(0)
);

let currentProduct: Product;

const cardTitle = document.querySelector(".c-card__header");
const cardImage = document.querySelector(".c-card__image");
const cardInfo = document.querySelector(".c-card__body");

const closeProductPageButton = document.getElementById(
  "product-page-close-button"
) as HTMLButtonElement;
const productPage = document.querySelector(
  "#wrapper-product-page"
) as HTMLElement;
const openCheckoutButton = document.querySelector(
  ".cart__checkout-button"
) as HTMLButtonElement;
const closeCheckoutButton = document.querySelector(
  "#checkout-close-button"
) as HTMLButtonElement;
const checkoutContainer = document.querySelector(".c-checkout") as HTMLElement;
const openCartButton = document.querySelector(
  "#main-cart-button"
) as HTMLButtonElement;
const closeCartButton = document.querySelector(
  ".cart__close-button"
) as HTMLButtonElement;
const cartContainer = document.querySelector(".cart") as HTMLElement;

const totalPriceTagCart = document.createElement("p");

closePage(closeCheckoutButton, checkoutContainer);
openPage(openCheckoutButton, checkoutContainer);
openPage(openCartButton, cartContainer);
closePage(closeCartButton, cartContainer);

openCartButton.addEventListener("click", stopScroll);
closeCartButton.addEventListener("click", stopScroll);
productPage.addEventListener("click", stopScroll);
closeProductPageButton.addEventListener("click", stopScroll);
closeCheckoutButton.addEventListener("click", () => {
  cartContainer.classList.remove("--active");
  document.body.classList.remove("stop-scroll");
});

cardTitle?.addEventListener("click", stopScroll);
cardImage?.addEventListener("click", stopScroll);
cardInfo?.addEventListener("click", stopScroll);

const buyButton = document.getElementById("modalButton") as HTMLButtonElement;
buyButton.addEventListener("click", handlePurchase);

const productPageCartButton = document.getElementById(
  "product-page-cart-button"
);
productPageCartButton?.addEventListener("click", () => {
  const checkId = cart.findIndex((product) => product.id === currentProduct.id);

  if (checkId !== -1) {
    currentProduct.quantity++;
    totalPrice += currentProduct.price;

    cartHtml();
    cartHtmlForCheckout();
    // quantityInCartIcon();
    cartContainItems();

  } else {
    cart.push(currentProduct);
    totalPrice += currentProduct.price;

    cartHtml();
    cartHtmlForCheckout();
    // quantityInCartIcon();
    cartContainItems();

  }
});

const createProductsHtml = () => {
  for (let i = 0; i < products.length; i++) {
    const list = document.querySelector(".l-list");
    const listItem = document.createElement("li");
    const productContainer = document.createElement("div");
    const productHeader = document.createElement("div");
    const productTitle = document.createElement("h2");
    const productBody = document.createElement("div");
    const productImage = document.createElement("img");
    const productPrice = document.createElement("p");
    const productId = document.createElement("p");
    const productSize = document.createElement("p");
    const productFooter = document.createElement("div");
    const addToCartButton = document.createElement("button");

    productTitle.innerHTML = products[i].title;
    productImage.innerHTML = products[i].imageUrl;
    productSize.innerHTML = products[i].size;
    productPrice.innerHTML = `${products[i].price.toString()} kr`;
    productImage.setAttribute("src", products[i].imageUrl);
    productId.innerHTML = "Art.nr: " + products[i].id;
    addToCartButton.innerHTML = "Lägg i varukorg";

    listItem.classList.add("l-list__item");
    productContainer.classList.add("c-card");
    productHeader.classList.add("c-card__header");
    productTitle.classList.add("c-card__title");
    productBody.classList.add("c-card__body");
    productImage.classList.add("c-card__image");
    productPrice.classList.add("c-card__price");
    productSize.classList.add("c-card__attribute");
    productId.classList.add("c-card__text");
    productFooter.classList.add("c-card__footer");
    addToCartButton.classList.add("c-button", "c-button--primary");

    listItem.appendChild(productImage);
    productContainer.appendChild(productHeader);
    productHeader.appendChild(productTitle);
    productContainer.appendChild(productBody);
    productBody.appendChild(productSize);
    productBody.appendChild(productPrice);

    list?.appendChild(listItem);
    listItem.appendChild(productContainer);
    productContainer.appendChild(productFooter);
    productFooter.appendChild(addToCartButton);

    addToCartButton.addEventListener("click", () => {
      const checkId = cart.findIndex(
        (product) => product.id === products[i].id
      );

      if (checkId !== -1) {
        products[i].quantity++;
        totalPrice += products[i].price;

        cartHtml();
        cartHtmlForCheckout();
        cartContainItems();
      } else {
        cart.push(products[i]);
        totalPrice += products[i].price;

        cartHtml();
        cartHtmlForCheckout();
        cartContainItems();
      }
    });

    const clickOnProduct = () => {
      const productPage = document.querySelector(".c-product-page");
      const productPageTitle = document.getElementById("product-page-title");
      const productPageImage = document.getElementById("product-page-image");
      const productPageInfo = document.getElementById("product-page-info");
      const readMore = document.getElementById(
        "read-more"
      ) as HTMLButtonElement;
      const productPageSize = document.getElementById("product-page-size");
      const productPagePrice = document.getElementById("product-page-price");
      const productPageWrapper = document.getElementById(
        "wrapper-product-page"
      );
      const productPageClose = document.getElementById(
        "product-page-close-button"
      );
      currentProduct = products[i];

      if (productPageWrapper) {
        productPageWrapper.classList.add("--active");
      }
      productPage?.classList.add("--active");

      if (productPageTitle) {
        productPageTitle.innerHTML = products[i].title;
      }
      if (productPageImage) {
        productPageImage.setAttribute("src", products[i].imageUrl);
      }
      if (productPageInfo) {
        productPageInfo.innerHTML = products[i].info;
      }
      if (productPageSize) {
        productPageSize.innerHTML = "Storlek: " + products[i].size;
      }
      if (productPagePrice) {
        productPagePrice.innerHTML = products[i].price.toString() + " kr";
      }
      readMore?.addEventListener("click", () => {
        if (productPageInfo?.classList.contains("--active")) {
          productPageInfo.classList.remove("--active");
          readMore.innerHTML = "Läs mer";
        } else {
          productPageInfo?.classList.add("--active");
          readMore.innerHTML = "Visa mindre";
        }
      });
      productPageClose?.addEventListener("click", () => {
        productPageWrapper?.classList.remove("--active");
        if (productPageInfo?.classList.contains("--active")) {
          productPageInfo.classList.remove("--active");
          readMore.innerHTML = "Läs mer";
        }
      });
    };
    productImage.addEventListener("click", clickOnProduct);
    productHeader.addEventListener("click", clickOnProduct);
    productBody.addEventListener("click", clickOnProduct);
  }
};

const cartHtml = () => {
  sessionStorage.setItem("cartItems", JSON.stringify(cart));
  sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));

  const cartContainer = document.querySelector("#cart-items");
  totalPriceTagCart.innerHTML = "Summa: " + totalPrice.toString() + " kr";

  if (cartContainer) {
    cartContainer.innerHTML = "";
  }
  for (let i = 0; i < cart.length; i++) {
    const listItem = document.createElement("li");
    const productContainer = document.createElement("div");
    const productHeader = document.createElement("div");
    const productTitle = document.createElement("h3");
    const imageContainer = document.createElement("figure");
    const productImage = document.createElement("img");
    const productBody = document.createElement("div");
    const productPrice = document.createElement("p");
    const articleNumber = document.createElement("p");
    const productSize = document.createElement("p");
    const cardFooter = document.createElement("div");
    const addButton = document.createElement("button");
    const quantityTag = document.createElement("span");
    const removeButton = document.createElement("button");

    listItem.classList.add("l-list__item");
    productContainer.classList.add("c-card-cart");
    productHeader.classList.add("c-card__header");
    imageContainer.classList.add("c-card-cart__figure");
    productImage.classList.add("c-card-cart__image");
    productBody.classList.add("c-card-cart__body");
    productPrice.classList.add("c-card__price");
    articleNumber.classList.add("c-card__id");
    productSize.classList.add("c-card__attribute");
    cardFooter.classList.add("c-card-cart__footer");

    productTitle.innerHTML = cart[i].title;
    productImage.setAttribute("src", cart[i].imageUrl);
    productPrice.innerHTML = cart[i].price.toString() + " kr";
    productSize.innerHTML = "Storlek: " + cart[i].size;
    articleNumber.innerHTML = "Art.nr: " + cart[i].id;
    addButton.innerHTML = "+";
    quantityTag.innerHTML = cart[i].quantity.toString();
    removeButton.innerHTML = "-";

    productContainer.appendChild(imageContainer);
    imageContainer.appendChild(productImage);
    productContainer.appendChild(productBody);
    productBody.appendChild(productTitle);
    productBody.appendChild(productPrice);
    productBody.appendChild(productSize);
    productBody.appendChild(articleNumber);
    productContainer.appendChild(cardFooter);
    cardFooter.appendChild(removeButton);
    cardFooter.appendChild(quantityTag);
    cardFooter.appendChild(addButton);
    listItem.appendChild(productContainer);

    cartContainer?.appendChild(listItem);

    addButton.addEventListener("click", () => {
      cart[i].quantity++;
      totalPrice += cart[i].price;

      cartHtml();
      cartHtmlForCheckout();
      // quantityInCartIcon();
      cartContainItems();
    });
    removeButton.addEventListener("click", () => {
      if (cart[i].quantity === 1) {
        totalPrice -= cart[i].price;
        cart.splice(i, 1);
        cartHtml();
        cartHtmlForCheckout();
        cartContainItems();
      } else {
        cart[i].quantity--;
        totalPrice -= cart[i].price;

        cartHtml();
        cartHtmlForCheckout();
        // quantityInCartIcon();
        cartContainItems();
      }
    });
  }
  document.querySelector(".cart__total-price")?.appendChild(totalPriceTagCart);
};

const cartHtmlForCheckout = () => {
  sessionStorage.setItem("cartItems", JSON.stringify(cart));
  sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));

  const cartInCheckout = document.querySelector("#checkout-cart-items");
  let totalPriceInCheckout = document.getElementById("total-price-checkout");
  if (totalPriceInCheckout) {
    totalPriceInCheckout.innerHTML = "Summa: " + totalPrice.toString() + " kr";
  }

  if (cartInCheckout) {
    cartInCheckout.innerHTML = "";
  }

  for (let i = 0; i < cart.length; i++) {
    const listItem = document.createElement("li");
    const productImage = document.createElement("img");
    const productBody = document.createElement("div");
    const productTitle = document.createElement("h3");
    const productPrice = document.createElement("p");
    const articleNumber = document.createElement("p");
    const cardFooter = document.createElement("div");
    const addButton = document.createElement("button");
    const quantityTag = document.createElement("span");
    const removeButton = document.createElement("button");

    productTitle.innerHTML = cart[i].title;
    productImage.setAttribute("src", cart[i].imageUrl);
    productPrice.innerHTML = cart[i].price.toString() + " kr";
    addButton.innerHTML = "+";
    quantityTag.innerHTML = cart[i].quantity.toString();
    removeButton.innerHTML = "-";
    articleNumber.innerHTML = "Art.nr: " + cart[i].id;

    listItem.classList.add("c-card-checkout");
    productBody.classList.add("c-card-checkout__body");
    cardFooter.classList.add("c-card-checkout__footer");

    listItem.appendChild(productImage);
    productBody.appendChild(productTitle);
    productBody.appendChild(productPrice);
    productBody.appendChild(articleNumber);
    listItem.appendChild(productBody);
    cardFooter.appendChild(removeButton);
    cardFooter.appendChild(quantityTag);
    cardFooter.appendChild(addButton);
    listItem.appendChild(cardFooter);

    cartInCheckout?.appendChild(listItem);

    addButton.addEventListener("click", () => {
      cart[i].quantity++;
      totalPrice += cart[i].price;

      cartHtml();
      cartHtmlForCheckout();
      // quantityInCartIcon();
      cartContainItems();
    });
    removeButton.addEventListener("click", () => {
      if (cart[i].quantity === 1) {
        totalPrice -= cart[i].price;
        cart.splice(i, 1);
        cartHtml();
        cartHtmlForCheckout();
        // quantityInCartIcon();
      } else {
        cart[i].quantity--;
        totalPrice -= cart[i].price;

        cartHtml();
        cartHtmlForCheckout();
        // quantityInCartIcon();
      }
    });
  }
};

function handlePurchase(event: Event) {
  event.preventDefault();

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const userEmail = emailInput.value;

  if (validateForm()) {
    showPurchaseModal(userEmail);
  }
}

function showPurchaseModal(userEmail: string) {
  const modal = document.getElementById("purchaseModal") as HTMLDivElement;
  modal.classList.add("--active");

  const orderDetailsContainer = document.createElement("div");
  orderDetailsContainer.classList.add("order-details-container");

  const modalContent = modal.querySelector(".modal-content") as HTMLDivElement;
  modalContent.innerHTML = `
    <div class="checkmark">&#10003;</div>
    <i id="closeModalButton" class="bi bi-x-lg"></i>
    <h3>Ditt köp har genomförts!</h3>
    <p class="purchaseModalEmail">Betalningsinstruktioner kommer skickas till: ${userEmail}</p>
    <h4>Orderdetaljer</h4>
  `;

  let totalOrderPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    const productDetails = document.createElement("p");
    productDetails.classList.add("order-details-item");
    const productPrice = cart[i].price * cart[i].quantity;
    totalOrderPrice += productPrice;
    productDetails.innerHTML = `
      ${cart[i].title} - ${productPrice} kr <br> Antal: ${cart[i].quantity}
    `;
    orderDetailsContainer.appendChild(productDetails);
  }

  const totalPriceTagModal = document.createElement("p");
  totalPriceTagModal.innerHTML = `<br>Totalt belopp: ${totalOrderPrice} kr`;
  orderDetailsContainer.appendChild(totalPriceTagModal);
  modalContent.appendChild(orderDetailsContainer);

  const closeModalButton = document.getElementById(
    "closeModalButton"
  ) as HTMLButtonElement;
  closeModalButton.addEventListener("click", () => {
    // modal.style.display = "none";
    modal.classList.remove("--active");

    //nollställer totalpriset efter genomfört köp
    totalPrice = 0;

    //tömmer cart arrayen och uppdaterar html
    cart.splice(0, cart.length);
    cartHtml();
    cartHtmlForCheckout();
    //stänger de öppna sidorna och scrollar till toppen
    checkoutContainer.classList.remove("--active");
    cartContainer.classList.remove("--active");
    productPage.classList.remove("--active");
    stopScroll();
    // quantityInCartIcon();
    window.scrollTo(0, 0);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

// visa fylld varukorg
const cartContainItems = () => {
  const cartIcon = document.getElementById("cart-icon");
  if (cart.length !== 0) {
    cartIcon?.classList.remove("bi-cart");
    cartIcon?.classList.add("bi-cart-fill");
  } else {
    cartIcon?.classList.remove("bi-cart-fill");
    cartIcon?.classList.add("bi-cart");
  }
};

createProductsHtml();
cartHtml();
cartHtmlForCheckout();

/* stopScroll(); */
// quantityInCartIcon();
cartContainItems();
