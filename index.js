const btnMostrarAlert = document.getElementById("btn-mostrar-alert");
  btnMostrarAlert.onclick = mostrarAlert();

  function mostrarAlert() {
  Swal.fire({
    icon: "error",
    title: "Ups",
    text: "Proyecto final en proceso!",
    });
  }

const kits = [
   {id:"Kit-Razer",product: 'Razer',price: 12000 ,quantity: 1,}, 
   {id:"Kit-Logitech",product: 'Logitech',price: 9000,quantity: 1,},
   {id:"Kit-HyperX",product: 'HyperX',price: 8000,quantity: 1,},
   {id:"Kit-Reddragon",product: 'Red-dragon',price: 5000,quantity: 1,}, 
 ];
// Desestructuracion de array
const [a, b, c, d] = kits
console.log(a)
console.log(b)
console.log(c)
console.log(d)

// SPREAD ARRAY
const kitsNuevos = [
  {id:"Kit-MSI",product: 'MSI',price: 7000 ,quantity: 1,}, 
  {id:"Kit-NOGANET",product: 'Logitech',price: 5000,quantity: 1,},
  {id:"Kit-COUGAR",product: 'HyperX',price: 10000,quantity: 1,},
];
const kits1 = [...kits, ...kitsNuevos]
console.log(kits1)


// ARRAY ALMACENADO
const localSave = (product, price) => { localStorage.setItem(product, price)}
localSave("kits", JSON.stringify(kits))

const containerCards = document.getElementById('container-cards');
const selectProducts = document.getElementById('select-products');
const tableCarts = document.getElementById('table-carts');
const tBody = document.getElementById('tBody');

//let imgSelected = " ";
let idProduct = 0;
const cart = [];
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const filterXPrice = document.getElementById('filterXPrice');
    
window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
closeModal.addEventListener('click',()=> modal.style.display = 'none');
filterXPrice.addEventListener('change', filterPoducts);
// OPERADOR TERNARIO ? :
function filterPoducts(event) {
  const responseFilter = event.target.value === 'Menores a 8000'
  ? kits.filter( kit => kit.price < 8000)
  : event.target.value === 'Entre 5000 y 10000'
  ? kits.filter( kit => kit.price >= 5000 && kit.price <= 10000)
  : event.target.value === 'Mayores a 8000'
  ? kits.filter( kit => kit.price > 8000)
  : null;

  containerCards.innerHTML = '';
  responseFilter.map( kit => createCards(kit));
}


function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  imgSelected = objectURL;   
}

function createNewProduct() {
  idProduct++;
  const titleProduct = newProduct.value;
  const priceProduct = newPrice.value;
  const id = idProduct;

  const newKit = {id:id,product: titleProduct,price: priceProduct,image: imgSelected};

  kits.push(newKit);
  listSelect();
  modal.style.display = 'none';
}

function showModal() {
  modal.style.display = 'flex';  
}

function renderCards() {
  kits.map( kit => { kit.product === selectProducts.value ? createCards(kit) : null } );
}

function listSelect() {
  selectProducts.innerHTML = '';  
  const anyOption = document.createElement('option');
  selectProducts.appendChild(anyOption);
  anyOption.textContent = 'Select a product';
  kits.map( kit => {
    const option = document.createElement('option');
    option.value = kit.product;
    option.textContent = kit.product;
    selectProducts.appendChild(option);
  });
}

function createCards(kit) {
  const { product, image, id, price } = kit;

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',`${id}-${product}`);
  imgCard.classList.add('img-product');

  const nameCard = document.createElement('p');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');

  const priceCard = document.createElement('p');
  priceCard.classList.add('price-product');
  priceCard.textContent = price;

  const btnAdd = document.createElement('button');
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');
  btnAdd.textContent = "Add to Cart";
  btnAdd.addEventListener('click', addToCart);


  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);

  containerCards.appendChild(card);
}

function addToCart(event) {

  // 1. identificar  el producto
  const idCurrentProduct = event.target.id;  

  // 2. Trae el producto
  const productSelected = kits.find( kit => kit.id === idCurrentProduct);
  console.log(productSelected);    

  // 3. Agregar al carrito
    if(cart.length === 0) {
      cart.push(productSelected);      
    }
    else {
      const isExist = cart.find( product => product.id === productSelected.id );
      if(isExist === undefined) {
        cart.push(productSelected);
      } else {
        isExist.quantity++;
      }
    }
    tBody.innerHTML = '';
    cart.map( element => {      
      renderCart(element);
    })    
}

function renderCart(product) {  
  
  const tr = document.createElement('tr');
    tr.classList.add('tr-products');
    
    tr.innerHTML = `
    <td>${product.product}</td>
    <td>${product.price}</td>
    <td><button class="decQuantity" id="decQuantity">-</button></td>        
    <td>${product.quantity}</td>
    <td><button class="addQuantity" id="addQuantity">+</button></td>
      <td>${(product.quantity * product.price).toFixed(2)}</td>  
      `
      tBody.appendChild(tr);      
// EVENTO
  const btnAdd = document.querySelector('.addQuantity');
    btnAdd.addEventListener('click', (event)=> {
    const productName = event.target.parentElement.parentElement.children[0].textContent;
    cart.map( element => {
      if (element.product === productName) {
        element.quantity++;          
      }
    });
  })
};



/*const contenedorProductos = document.getElementById('container-cards')

stockProductos.forEach((producto) => {
  const div = document.createElement('div')
  div.classList.add('producto')
  div.innerHTML 
})*/


function registrarProducto (producto) {
  fetch("https://62e859f7249bb1284ead6466.mockapi.io/kits",{
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      "Content-type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((data) => console.log(data));
}

const productoAResgistrar = [
  {
    "product": "Razer",
    "price": 12000,
    "quantity": 1,
    "id": "1"
  },
  {
    "product": "Logitech",
    "price": 9000,
    "quantity": 1,
    "id": "2"
  },
  {
    "product": "HyperX",
    "price": 8000,
    "quantity": 1,
    "id": "3"
  },
  {
    "product": "Red-dragon",
    "price": 5000,
    "quantity": 1,
    "id": "4"
  },
  {
    "product": "Msi",
    "price": 8000,
    "quantity": 1,
    "id": "5"
  },
  {
    "product": "Noganet",
    "price": 5000,
    "quantity": 1,
    "id": "6"
  },
  {
    "product": "Cougar",
    "price": 10000,
    "quantity": 1,
    "id": "7"
  }
]
registrarProducto(productoAResgistrar)