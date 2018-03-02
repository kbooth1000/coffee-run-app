var coffeeOrders = [],
    storedOrders = [];

var orderForm = document.querySelector('form');
var orderName = orderForm.querySelector('[name="coffee"]');
var orderEmail = orderForm.querySelector('[name="emailAddress"]');
var sizeInputs = orderForm.querySelectorAll('[name="size"]');
var orderSize = orderForm.querySelector('[name="size"]:checked'); //value that is checked by default

var getOrderSize = function() { // new value after user selects radio button
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
orderDisplay.appendChild(orderList);


var createOrderDisplay = function(orderNumber) {

    var orderDisplayString = '';
    var orderRows = document.querySelectorAll('.orderRow');
    console.log('orderRows: ' + orderRows);
    // Add stored orders to orderDisplayString
    if (orderDisplayString === '') {
        orderDisplayString = localStorage.getItem('order');
    }

    clearOrderDisplay(); // Remove existing orderRows from display prior to repopulating

    

    storedOrders.push(coffeeOrders[orderNumber]);
    //console.log('Stored orders: ' + storedOrders);

    var storedOrdersString = storedOrders;
    orderDisplayString = storedOrders;
    storedOrdersString.toString();
    localStorage.setItem('order', storedOrdersString);

    createDisplayRow();
    displayCoffeeOrders();
}

clearOrderDisplay = function() {
    for (var i=0; i<orderList.childNodes.length;i++) {
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
    }
}

var createDisplayRow = function() {
    for (var i = 0; i < coffeeOrders.length; i++) {
        var orderRow = document.createElement('li'); // Create display row
        orderRow.className = 'orderRow';
        orderList.appendChild(orderRow);
        orderRow.textContent += getRetrievedOrders()[i];
    }
}

var displayCoffeeOrders = function() {
    for (var i = 0; i < coffeeOrders.length; i++) {
        var orderRow = document.createElement('li'); // Create display row
        orderRow.className = 'orderRow';
        orderList.appendChild(orderRow);
        orderRow.textContent += coffeeOrders[i];
    }
}

var orderObject = {};
var getRetrievedOrders = function() {
    var retrievedOrdersList = [];
    var retrievedOrders = $.ajax({
    async:     'false',
    type:     'GET',
    url:      'http://dc-coffeerun.herokuapp.com/api/coffeeorders',
    dataType: 'json',
    success: function(data){
       // console.log(data);
        
        for (var key in data) {
            var datakey = data[key];
            var orderkey = 0;
            var orderID, orderCaffeine, orderFlavor, orderSize, orderEmail, orderName;
            var arrayOfOrderKeys = ['orderID', 'orderCaffeine', 'orderFlavor', 'orderSize', 'orderEmail', 'orderName'];
            var orderArray = [];
            for (var orderPart in datakey){
                orderArray[orderkey] = datakey[orderPart];
                orderkey ++;
            }
            
            for(var i=0;i<orderArray.length;i++) {
                
                var ovalue = orderArray[i], okey = arrayOfOrderKeys[i];

                orderObject[okey] = ovalue;
                retrievedOrdersList.push(['&& '+orderObject['orderID'], orderObject['orderCaffeine'], orderObject['orderFlavor'], orderObject['orderSize'], orderObject['orderEmail'], orderObject['orderName']]);
                
            }
        }
        
    }
    
    
    });
    return retrievedOrdersList;
}

createOrderDisplay();

  
  
// orderID, orderCaffeine, orderFlavor, orderSize, orderEmail, orderName