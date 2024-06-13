let menus = ["Pizza Salami", "Chicken Biryani"]
let prices = [8.50, 11.50]
let amounts = [1, 1]

function getValueFromInput(input) {
  return document.getElementById(input).value;
}

function getMenuFromInput() {
  let menu = getValueFromInput('menu');
  menu = menu.trim();
  return menu;
}

function getPriceFromInput() {
  let price = getValueFromInput('price');
  price = Number(price);
  return price;
}

function onAddMenu() {
  let menuInput = getMenuFromInput();
  let priceInput = getPriceFromInput();
  let menuIndex = getMenuIndex(menuInput);
  if (menuIndex == -1) {
    menus.push(menuInput);
    prices.push(priceInput);
    amounts.push(1);
  } else {
    amounts[menuIndex]++;
  }
}

function getMenuIndex(menu) {
  let index = menus.indexOf(menu);
  return index;
}