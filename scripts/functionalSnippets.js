// $.ajax({url: 'theurl'}, {method: 'DELETE'});

// $.ajax({url: 'http://dc-coffeerun.herokuapp.com/api/coffeeorders' + order.email}, {method: 'GET'});


var form = document.querySelector('#coffeForm')

var getCoffeeFormFields = function() {
    var email = form.emailAddress;
    var order = {email: email );}
    return order;
}

var addOrder = function(orders, order) {
    var newOrders - orders.slice();
    newOrders.push(order);
    return newOrders;
}

var order = [];

getData(function(ordersFromServer) {
    render(ordersFromServer, orderContainer); // render is not yet defined
})

var getData = function(callback) {
    $.get('...', function(orderData) {
        var orders = Object.values(ordersData); // convert the orderData object to array of values
        callback(orderData);
    })
}

var createRow = function(order) {
    var row = docment.createEement('p');
    row.textContent = order.email;
    return row;
}

var orderContainer = document.querySelector('#orderContainer'); // create a new DOM element

form.addEventListener('submit', function(event) {
    event.preventDefault();
    getCoffeeFormFields(form);
    var order = getCoffeeFormFields(order);
    var orders = addOrder(orders, order);
    orderContainer.appendChild(row); // add it to the DOM
})

var ordersList = [];

ordersList.map(function(rawOrder) {
    return {
        email: rawOrder.emailaddress,
        barista: 'some default',
        coffee: rawOrder.coffee
    };
})

var createRow = function(order) {
    
    Object.keys(order).forEach(function(key) {
        order[key]
    })
}

