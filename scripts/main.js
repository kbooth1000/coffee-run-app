var coffeeOrders = [], storedOrders = [];

var orderForm = document.querySelector('form');
var orderName = orderForm.querySelector('[name="coffee"]');
var orderEmail = orderForm.querySelector('[name="emailAddress"]');
var sizeInputs = orderForm.querySelectorAll('[name="size"]');
var orderSize = orderForm.querySelector('[name="size"]:checked');

var getOrderSize = function() {
    for(var i=0;i<sizeInputs.length;i++) {
    if(sizeInputs[i].checked) {
        return sizeInputs[i];;
    }
}}
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
    for(var i = 0; i<orderInputs.length;i++) {
        coffeeOrders[orderNumber][i] = orderInputs[i].value;
    }
    console.log(coffeeOrders[orderNumber]);
    createOrderDisplay(orderNumber);
    orderNumber++;
}

orderForm.addEventListener('submit', compileOrder);
var orderDisplay = document.querySelector('.orderDisplay');

var createOrderDisplay = function(orderNumber) {
    var orderList = document.createElement('ul');
    orderDisplay.appendChild(orderList)

    //coffeeOrders.forEach(order => {
        console.log('••');
        var orderRow = document.createElement('li');
        if(orderRow.textContent === ''){
            orderRow.textContent = localStorage.getItem('order');
            console.log('No text' + localStorage.getItem('order'));
        }
        orderRow.className = 'orderRow';
        
        console.log( 'Order '+ orderNumber + ': ' + coffeeOrders[orderNumber]);

        //orderRow.textContent += '\nOrder ' + orderNumber + ': ' + coffeeOrders[orderNumber];
        orderList.appendChild(orderRow);

        for( var i = 0;i<coffeeOrders.length;i++ ) {
            coffeeOrders[i] = '## ' + coffeeOrders[i];
        }
        storedOrders.push(coffeeOrders[orderNumber]);
        
        var storedOrdersString = storedOrders;
        storedOrdersString.toString();
        //storedOrdersString.replace(/[\W_]+/g," ");
        localStorage.setItem('order', storedOrdersString);
        orderRow.textContent += '\nOrder ' + orderNumber + ': ' + storedOrdersString;
   // });
    
    orderList.classList.add('show');
}
    