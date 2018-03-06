var keyNames = [ 'coffee', 'emailAddress', 'size', 'flavor', 'strength'];


var coffeeOrders = [],
    storedOrders = [];
var url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';
var getRetrievedOrders = fetch(url)
    .then(function(response) {
        return response.json();
    });
var postOrder = function(order){
    console.log('ORDER: '+ order);
    
    var postRequest = fetch(url, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}
var deleteOrder = function(order) {
    console.log('Delete: ' + order.emailAddress);
    fetch(url + '/' + order.emailAddress, {
        method: 'DELETE'
    }).then(response =>
        response.json().then(json => {
            return json;
        })
    );
}

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

var postNewOrder = function(order) {
    postOrder(order);
    console.log('###'+ order);
    
}

var compileOrder = function(e) {
    e.preventDefault();
    orderSize = getOrderSize();
    var orderInputs = [
        orderName, orderEmail, orderSize, orderFlavor, orderCaffeine
    ]
    var keyPairs = [];
    coffeeOrders[orderNumber] = [];
    for (var i = 0; i < orderInputs.length; i++) {
        coffeeOrders[orderNumber][i] = orderInputs[i].value;
        keyPairs.push( [keyNames[i], orderInputs[i].value] );
        console.log('keyPairs: '+keyPairs[i]);
    }
    var keyPairObj = keyPairs.reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{});
    console.log('keyPairObj: ' + keyPairObj);
    
    postNewOrder(keyPairObj);
    createOrderDisplay(orderNumber);
    createDisplayRow(keyPairObj);
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
    var storedOrdersString = storedOrders;
    orderDisplayString = storedOrders;
    storedOrdersString.toString();
    getRetrievedOrders.then(function(data){
        keys = [];
        for(key in data) {
            keys.push(data[key]);          
        }
        for(var i=0;i<keys.length;i++) {
            createDisplayRow(keys[i]);
        }
    })
}

var clearOrderDisplay = function() {
    for (var i=0; i<orderList.childNodes.length;i++) {
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
    }
}

var getOrderData = function(data){
    var retrievedOrdersList = [];
     for (var key in data) {
         var datakey = data[key];
         var orderkey = 0;
         var orderID, orderCaffeine, orderFlavor, orderSize, orderEmail, orderName;
         var arrayOfOrderKeys = ['coffee', 'emailAddress', 'size', 'flavor', 'strength'];
         var orderArray = [];
         for (var orderPart in datakey){
             orderArray[orderkey] = datakey[orderPart];
             console.log('k-v: '+orderPart +', '+orderArray[orderkey]);
             orderkey ++;
         }
         for(var i=0;i<orderArray.length;i++) {
             var ovalue = orderArray[i], okey = arrayOfOrderKeys[i];
             orderObject[okey] = ovalue;
             retrievedOrdersList.push([orderObject['strength'], 
             orderObject['flavor'], orderObject['size'], orderObject['emailAddress'], 
             orderObject['coffee']]);
         }
     }
     console.log('retrievedOrdersList: '+retrievedOrdersList);
         return retrievedOrdersList;
 }

var createDisplayRow = function(order) {
            var orderRow = document.createElement('li'); // Create display row
            orderRow.className = 'orderRow';
            orderList.appendChild(orderRow);
            orderRow.textContent += `${order.coffee}: ${order.emailAddress}, ${order.size}`; 
            orderRow.addEventListener('click', function() {
                deleteOrder(order)
            });
};



var orderObject = {};

var test = function(data) {
    console.log('testdata: '+ data);
}



getRetrievedOrders.then(function(data) {
        keys = [];
        for(key in data) {
            keys.push(data[key]);          
        }
      //  console.log('keys: '+keys);
        getOrderData(keys);
    });

createOrderDisplay();

  
  
// orderID, orderCaffeine, orderFlavor, orderSize, orderEmail, orderName







// NICK'S CODE
// orders = [                                                                         
//     {"strength":0,"flavor":"None","size":"tall","emailAddress":"person@email.com","coffee":"Coffee"}, 
//     {"strength":3,"flavor":"mocha","size":"tall","emailAddress":"jamlicious@gmail.com","coffee":"latte"},
//     {"flavor":"almond","strength":30,"size":"short","emailAddress":"xyz@who.com","coffee":"latte"},
//     {"strength":10,"flavor":"caramel","size":"tall","emailAddress":"uni@gallop.org","coffee":"love"},
// ]                                                                                  
                                                                                   
// var $popBtn = $('#popBtn');                                                        
// $popBtn[0].addEventListener('click', function(event) {                             
//     event.preventDefault();                                                        
//     for (var i = 0; i < orders.length; i++) {                                      
//         var order = {                                                              
//             coffee: orders[i]['coffee'],                                           
//             emailAddress: orders[i]['emailAddress'],                               
//             size: orders[i]['size'],                                               
//             flavor: orders[i]['flavor'],                                           
//             strength: orders[i]['strength']                                        
//         };                                                                         
//         $.post("https://dc-coffeerun.herokuapp.com/api/coffeeorders", order, function(resp) {
//             console.log(resp)                                                      
//         });                                                                        
//     }                                                                              
// });              