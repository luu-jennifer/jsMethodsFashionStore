// store inventory object
const totalInventory = [
  {
    title: 'Bowie Tee',
    url: 'images/bowie.jpg',
    price: 19.99,
    stock: 4,
  },
  {
    title: 'Don\'t Know Tee',
    url: 'images/dontevenknow.jpg',
    price: 22.50,
    stock: 8,
  },
  {
    title: 'Doughnut Jean Jacket',
    url: 'images/doughnut.jpg',
    price: 59.00,
    stock: 5,
  },
  {
    title: 'Journey Tee',
    url: 'images/journey.jpg',
    price: 22.99,
    stock: 6,
  },
  {
    title: 'Skeleton Jean Jacket',
    url: 'images/someurl.jpg',
    price: 30.00,
    stock: 0,
  },
  {
    title: 'Skeleton Hand Tee',
    url: 'images/skeleton.jpg',
    price: 30.00,
    stock: 10,
  },
  {
    title: 'Juno Hoodie',
    price: 50.00,
    stock: 4,
  }
]

//NAMESPACE for app
const coolStore = {};

// currency data for app
coolStore.currencies = {
  usd: {
    exchange: 1,
    symbol: `$`,
    displayName: `USD`,
    altText: `the US flag`,
    flag: `images/USD-flag.png`
  },
  cad: {
    exchange: 1.28,
    symbol: `$`,
    displayName: `CAD`,
    altText: `the Canadian flag`,
    flag: `images/CAD-flag.png`
  },
  gbp: {
    exchange: 0.76,
    symbol: `£`,
    displayName: `GBP`,
    altText: `the UK flag`,
    flag: `images/GBP-flag.png`
  }
}


//functional programming // .init function for app

coolStore.init = () => {
  // function that displays available inventory on page in correct currency
  coolStore.inventoryCheck();
  // event listener on click currency button for currency selected, calls display items and update top right flag
  coolStore.currencyChanger();
};



// .filter thru inventory for in stock items with images then call function to display items in USD (default currency)
coolStore.inventoryCheck = () => {
  coolStore.currentStock = totalInventory.filter( (item) => {
    return item.stock > 0 && item.url;
  });
  // Call function to display current stock inventory on page with default USD currency:
  coolStore.displayItems(coolStore.currencies.usd);
};



// Function to display items in chosen currency
  coolStore.displayItems = (chosenCurrency) => {
    const inventoryElement = document.querySelector('.inventory');
    inventoryElement.innerHTML = '';

    coolStore.currentStock.forEach( (individualItem) => {
      const newListItem = document.createElement('li');
      newListItem.innerHTML = `
      <h2>${individualItem.title}</h2>
      <img src="${individualItem.url}" alt="a model wearing ${individualItem.title}">
      <p>${(individualItem.price * chosenCurrency.exchange).toFixed(2)}</p>
      `;

      inventoryElement.appendChild(newListItem);
    });
  };


// function that will listen for click on currency and update inventory individual item price and the currency flag and name

  coolStore.currencyChanger = () => {
    const button = document.querySelectorAll('button');
    const flagImage = document.querySelector('#flag');
    const nameOfCurrency = document.querySelector('#currency');

    button.forEach( (individualButton) => {
      individualButton.addEventListener("click", function() {
        
        // this = node <button id="(currency that is clicked on)">
        const selectCurrency = this.id;

        coolStore.displayItems( coolStore.currencies[selectCurrency] );

        flagImage.src = coolStore.currencies[selectCurrency].flag;
        flagImage.alt = coolStore.currencies[selectCurrency].altText;
        nameOfCurrency.textContent = coolStore.currencies[selectCurrency].displayName;

      });
    });




  }

// call/initiate the app
coolStore.init();