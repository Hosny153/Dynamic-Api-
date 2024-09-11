const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const Port = 9000
const app = express()

const query = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"shopping"
})

app.use(express.json())
app.use(cors())


app.get("/Products", (req, res) => {
    query.execute(`SELECT * FROM products`,
    (err, data) => {
        if (err) {
            res.json({ message: "Error", err });
        } else {
            res.json({ message: "Success", data });
        }
    });
});

app.get("/Products/:id", (req, res) => {
    const { id } = req.params;
    query.execute(
        `SELECT id, name, price, descrption FROM products WHERE id="${id}"`,
        (err, data) => {
            if (err) {
                res.json({ message: "Error", err });
            } else {
                res.json({ message: "Success", data });
            }
        }
    );
});



app.post("/AddProducts", (req, res) => {
    const { name, price, descrption } = req.body;
    query.execute(
        `INSERT INTO products (name, price, descrption) VALUES ('${name}','${price}','${descrption}')`
    );
    res.json({ message: "Product added successfully." });
});



app.put("/UpdProducts/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, descrption } = req.body;
    query.execute(
        `UPDATE products SET name="${name}",price="${price}",descrption="${descrption}" WHERE id="${id}"`
    );
    res.json({ message: "Product updated successfully" });
});



app.delete("/DelProducts/:id", (req, res) => {
    const { id } = req.params;
    query.execute(`DELETE FROM products WHERE id="${id}"`);
    res.json({ message: "Product deleted successfully" });
});



app.listen(Port , ()=>{
    console.log(`Serve is running on ${Port}!!`)
})
