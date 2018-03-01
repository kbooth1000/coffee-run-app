var coffeeOrders = [],
    storedOrders = [];

var orderForm = document.querySelector('form');
var orderName = orderForm.querySelector('[name="coffee"]');
var orderEmail = orderForm.querySelector('[name="emailAddress"]');
var sizeInputs = orderForm.querySelectorAll('[name="size"]');
var orderSize = orderForm.querySelector('[name="size"]:checked');

var getOrderSize = function() {
    for (var i = 0; i < sizeInputs.length; i++) {
        if (sizeInputs[i].checked) {
            return sizeInputs[i];;
        }
    }
}
var orderSizes = orderForm.querySelectorAll('[name="size"]:checked');

var orderFlavor = orderForm.querySelector('[name="flavor"]');
var orderCaffeine = orderForm.querySelector('[name="strength"]');

var orderNumber = 0;

var compileOrder = function(e) {
    e.preventDefault();
    orderSize = getOrderSize();
    var orderInputs = [
        orderName, orderEmail, orderSize, orderFlavor, orderCaffeine
    ]

    coffeeOrders[orderNumber] = [];
    for (var i = 0; i < orderInputs.length; i++) {
        coffeeOrders[orderNumber][i] = orderInputs[i].value;
    }
    createOrderDisplay(orderNumber);
    orderNumber++;
}

orderForm.addEventListener('submit', compileOrder);
var orderDisplay = document.querySelector('.orderDisplay');
var orderList = document.createElement('ul');
orderList.textContent = '';
orderDisplay.appendChild(orderList)

var createOrderDisplay = function(orderNumber) {

    


    var orderDisplayString = '';

    // Add stored orders to orderDisplayString
    if (orderDisplayString === '') {
        orderDisplayString = localStorage.getItem('order');
    }

    // Remove existing orderRows from display
    var orL = document.querySelectorAll('.orderRow');
    for (var i=0; i<orL.length;i++) {
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
    }

    storedOrders.push(coffeeOrders[orderNumber]);
    console.log('Stored orders: ' + storedOrders);

    var storedOrdersString = storedOrders;
    orderDisplayString = storedOrders;
    storedOrdersString.toString();
    //storedOrdersString.replace(/[\W_]+/g," ");
    localStorage.setItem('order', storedOrdersString);

    //orderList.removeChild(orL);

    // Separately display coffeeorders
    for (var i = 0; i < coffeeOrders.length; i++) {
        var orderRow = document.createElement('li'); // Create display row
        orderRow.className = 'orderRow';
        orderList.appendChild(orderRow);
        orderRow.textContent += coffeeOrders[i];
    }

    // orderRow.textContent = orderDisplayString;

    orderList.classList.add('show');
}