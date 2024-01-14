const express = require("express");
const cors = require('cors');
const connect = require('./db/config');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/states', (req, res) => {
  const query = `SELECT * FROM states`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})

app.get('/customers', (req, res) => {
  const query = `SELECT customers.*, cities.name city_name FROM customers 
                LEFT JOIN cities ON customers.city = cities.id`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)} else {res.send(result)}
  })
})

app.get('/customer-payment', (req, res) => {
  const query = `SELECT customer_payment.*, customers.customer_name FROM customer_payment 
  LEFT JOIN customers ON customer_payment.customer_id = customers.id;`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.get('/vendor-payment', (req, res) => {
  const query = `SELECT vendor_payment.*, vendors.vendor_name FROM vendor_payment LEFT JOIN vendors ON vendor_payment.vendor_id = vendors.id;`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.get('/vendorstock', (req, res) => {
  const query=`SELECT  vs.*, v.vendor_name, COUNT(vsi.stock_id) items, 
  sum(vsi.item_rate * vsi.item_quantity) amount 
  FROM vendor_stock_item  vsi
  left join vendor_stock vs  on vs.id = vsi.stock_id 
  left join vendors v on vs.vendor_id = v.id
  GROUP by vsi.stock_id;`
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.get('/cities', (req, res) => {
  const query = `SELECT cities.*, states.name as state_name  FROM cities LEFT JOIN states ON cities.state = states.id`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.get('/vendors', (req, res) => {
  const query = `SELECT vendors.*, cities.name as city_name FROM vendors LEFT JOIN cities ON vendors.city = cities.id`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.get('/states/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM states WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})
app.get('/customers/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT customers.*, cities.name city_name FROM customers 
  LEFT JOIN cities ON customers.city = cities.id WHERE customers.id = ${id}`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.get('/customer-payment/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT customer_payment.*, customers.customer_name FROM customer_payment LEFT JOIN
  customers ON customer_payment.customer_id = customers.id WHERE customer_payment.id = ${id};`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.get('/vendor-payment/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT vendor_payment.*, vendors.vendor_name FROM vendor_payment LEFT JOIN vendors ON vendor_payment.vendor_id = vendors.id WHERE vendor_payment.id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {res.send("Error: ", err)} else {res.send(result)}
  })
})

app.get('/vendorstockitem/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM vendor_stock_item WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.get('/cities/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT cities.*, states.name as state_name  FROM cities LEFT JOIN states ON cities.state = states.id WHERE cities.id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.get('/vendors/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT vendors.*, cities.name as city_name  FROM vendors LEFT JOIN cities ON vendors.city = cities.id WHERE vendors.id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.post('/states', (req, res) => {
  let query = `INSERT INTO states(name) values(?)`
  connect.query(query, [req.body.name], (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})

app.post('/customers', (req, res) => {
  const name = req.body.name;
  const mob1 = req.body.mobile1;
  const mob2 = req.body.mobile2;
  const address = req.body.address;
  const city = req.body.city;
  const query = `INSERT INTO customers(customer_name, mobile1, mobile2, address, city) VALUES(
  '${name}', '${mob1}', '${mob2}', '${address}', ${city})`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.post('/customer-payment', (req, res) => {
  const cust_id = req.body.customerName;
  const amount = req.body.amount;
  const pay_method = req.body.paymentMethod;
  const date = req.body.date;
  const description = req.body.description;
  const query = `INSERT INTO customer_payment(customer_id, amount, payment_method, payment_date, description)
  VALUES(${cust_id}, ${amount}, '${pay_method}', ${date}, '${description}');`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.post('/vendor-payment', (req, res) => {
  const ven_id = req.body.vendorName;
  const amount = req.body.amount;
  const pay_method = req.body.pamentMethod;
  const date = req.body.date;
  const description = req.body.description;
  const query = `INSERT INTO vendor_payment(vendor_id, amount, payment_method, payment_date, description)
  VALUES(${ven_id}, ${amount}, '${pay_method}', ${date}, '${description}')`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.post('/vendorstockitem', (req, res) => {
  const vendor_id = req.body.vendor_id;
  const invoice_number = req.body.invoice_number;
  const order_date = req.body.order_date;
  let query = `INSERT INTO vendor_stock (vendor_id, invoice_number, order_date) VALUES
  (${vendor_id}, ${invoice_number}, '${order_date}')`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      const stockId = result.insertId;
      const items = req.body.items;
      let query1 = `INSERT INTO vendor_stock_item (stock_id, item_name, item_rate, item_quantity,  item_description) VALUES`
      items.forEach(element => {
        query1 += `(${stockId}, '${element.itemName}', '${element.itemRate}', '${element.itemQuantity}', '${element.itemDescription}'),`
      });
      query1 = query1.slice(0, -1);
      //res.send(query1);
      connect.query(query1, (err, result) => {
        if (err) {
          res.send("Error: ", err);
        } else {
          res.send(result);
        }
      })
    }
  })
})

app.post('/cities', (req, res) => {
  const name = req.body.name;
  const state = req.body.state;
  let query = `INSERT INTO cities (name, state) VALUES ('${name}', '${state}')`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.post('/vendors', (req, res) => {
  const name = req.body.name;
  const mobile1 = req.body.mobile1;
  const mobile2 = req.body.mobile2;
  const address = req.body.address;
  const city = req.body.city;
  let query = `INSERT INTO vendors (vendor_name, mobile1, mobile2, address, city)
  VALUES('${name}', '${mobile1}', '${mobile2}', '${address}', '${city}')`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err)
    } else {
      res.send(result);
    }
  })
})

app.put('/states/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  let query = `UPDATE states SET name = ${name} WHERE id = ${id}`
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})

app.put('/customers/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const mob1 = req.body.mobile1;
  const mob2 = req.body.mobile2;
  const address = req.body.address;
  const city = req.body.city;
  const query = `UPDATE customers SET customer_name = '${name}', mobile1 = '${mob1}', mobile2 = '${mob2}',
  address = '${address}', city = ${city} WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.put('/customer-payment/:id', (req, res) => {
  const id = req.params.id;
  const cust_id = req.body.customerName;
  const amount = req.body.amount;
  const pay_meth = req.body.paymentMethod;
  const pay_date = req.body.date;
  const description = req.body.description;
  const query = `UPDATE customer_payment SET customer_id = '${cust_id}', amount = '${amount}',
  payment_method = '${pay_meth}', payment_date = '${pay_date}', description = '${description}'
  WHERE id = '${id}';`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.put('/vendor-payment/:id', (req, res) => {
  const id = req.params.id;
  const ven_id = req.body.vendorName;
  const amount = req.body.amount;
  const pay_meth = req.body.pamentMethod;
  const pay_date = req.body.date;
  const description = req.body.description;
  const query = `UPDATE vendor_payment SET vendor_id = '${ven_id}', amount = '${amount}', 
  payment_method = '${pay_meth}', payment_date = '${pay_date}', description = '${description}' 
  WHERE id = '${id}'`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.put('/vendorstockitem/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.itemName;
  const rate = req.body.itemRate;
  const quantity = req.body.itemQuantity;
  const description = req.body.itemDescription;
  const query = `UPDATE vendor_stock_item SET item_name='${name}', item_rate='${rate}', 
  item_Quantity='${quantity}', item_discription='${description}' WHERE id = '${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.put('/cities/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const state = req.body.state;
  let query = `UPDATE cities SET name = '${name}', state = '${state}' WHERE id = '${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})

app.put('/vendors/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const mobile1 = req.body.mobile1;
  const mobile2 = req.body.mobile2;
  const address = req.body.address;
  const city = req.body.city;
  let query = `UPDATE vendors SET vendor_name='${name}', mobile1='${mobile1}', 
  mobile2='${mobile2}', address='${address}', city='${city}' WHERE id = '${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err)
    } else {
      res.send(result);
    }
  })
})

app.delete('/states/:id', (req, res) => {
  const id = req.params.id;
  let query = `DELETE FROM states WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  });
})

app.delete('/customer-payment/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM customer_payment WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.delete('/vendor-payment/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM vendor_payment WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if(err){res.send("Error: ", err)}else{res.send(result)}
  })
})

app.delete('/vendorstockitem/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM vendor_stock_item WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) { res.send("Error: ", err) }
    else { res.send(result) }
  })
})

app.delete('/cities/:id', (req, res) => {
  const id = req.params.id;
  let query = `DELETE FROM cities WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/vendors/:id', (req, res) => {
  const id = req.params.id;
  let query = `DELETE FROM vendors WHERE id = ${id}`;
  connect.query(query, (err, result) => {
    if (err) {
      res.send("Error: ", err);
    } else {
      res.send(result);
    }
  })
})

app.listen(5000);