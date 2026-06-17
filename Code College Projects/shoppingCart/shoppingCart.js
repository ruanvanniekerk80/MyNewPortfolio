const products = [
   { name: "Coke", price: 7.5, quantity: 0, imgSrc: "images/coke.png" },
   { name: "Kit Kat", price: 9.5, quantity: 0, imgSrc: "images/kitKat.png" },
   { name: "Bar One", price: 8.5, quantity: 0, imgSrc: "images/barOne.png" },
   { name: "Fanta", price: 7.5, quantity: 0, imgSrc: "images/fanta.png" },
   { name: "Lunch Bar", price: 10, quantity: 0, imgSrc: "images/LunchBar.png" }
];

function renderMenu() {
   const menu = document.getElementById("menu");
   menu.innerHTML = "";

   products.forEach((product, index) => {
      const itemTotal = (product.price * product.quantity).toFixed(2);

      menu.innerHTML += `
        <tr>
          <td><img src="${product.imgSrc}" width="50"></td>
          <td>${product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>
            <button onclick="removeSelection(${index})">−</button>
            ${product.quantity}
            <button onclick="addSelection(${index})">+</button>
          </td>
          <td>${itemTotal}</td>
        </tr>
      `;
   });
}

function addSelection(index) {
   products[index].quantity++;
   renderMenu();
}

function removeSelection(index) {
   if (products[index].quantity > 0) {
      products[index].quantity--;
      renderMenu();
   }
}

function finalResult() {
   const total = products.reduce(
      (sum, p) => sum + p.price * p.quantity, 0
   );

   document.getElementById("total").textContent = total.toFixed(2);
}

renderMenu();
