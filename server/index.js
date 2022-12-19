// console.log('Second Code');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

async function dbConnect() {
    return await mongoose.connect('mongodb://localhost:27017/Mydatabase');
}
dbConnect()
    .then((res) => {
    })
    .catch((err) => {
        console.log(err);
    })

const Schema = mongoose.Schema;
const catSchema = new Schema({
    name: String
});
const catModel = mongoose.model('categories', catSchema);


const productSchema = new Schema({
    name: String,
    catid: String
});
const productModel = mongoose.model('products', productSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get("/category-list", async (req, res) => {
    var ans_cat = await catModel.find();
    res.send(ans_cat);
})
app.get("/category-list/:id", async (req, res) => {
    var ans_cat = await catModel.findById(req.params.id);
    res.send(ans_cat);
})
app.get("/product-list", async (req, res) => {
    var ans_count = await productModel.countDocuments();
    var ans_product = await productModel.aggregate([
        {
            "$lookup": {
                "let": { "catid": { "$toObjectId": "$catid" } },
                "from": "categories",
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$catid"] } } }
                ],
                "as": "catvalues"
            }
        },
        { "$skip": 0 },
        { "$limit": 10 }
    ]);

    console.log(ans_product);
    console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})
app.get("/product-category-list/:id", async (req, res) => {
    var ans_product_by_id = await productModel.findById(req.params.id);
    var ans_cat = await catModel.find();
    res.send({
        catRecord: ans_cat,
        productRec: ans_product_by_id
    });
})

app.get("/product-list/:skipvalue/:limitdata", async (req, res) => {
    var ans_count = await productModel.countDocuments();
    var ans_product = await productModel.aggregate([
        {
            "$lookup": {
                "let": { "catid": { "$toObjectId": "$catid" } },
                "from": "categories",
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$catid"] } } }
                ],
                "as": "catvalues"
            }
        },
        { "$skip": Number(req.params.skipvalue) },
        { "$limit": Number(req.params.limitdata) }
    ]);

    res.send({
        ans_product,
        ans_count
    });
})

app.delete("/delete-category-list/:myid", async (req, res) => {
    console.log(req.params);

    var ans_cat = await catModel.findByIdAndRemove(req.params.myid);
    res.send({ msg: true })
})

app.post("/category-list-add", async (req, res) => {
    console.log(req.body);
    const instance = new catModel(req.body);
    const ans_insert = await instance.save();
    console.log("After Insert");
    console.log(ans_insert);
    res.send({ msg: "CATEGORY POST ROUTE CALLED" });
});

app.post("/product-list-add", async (req, res) => {
    console.log(req.body);
    const instance = new productModel(req.body);
    const ans_insert = await instance.save();
    res.send({ msg: "PRODUCT Added" });
});

app.delete("/delete-product-list/:productid", async (req, res) => {
    console.log(req.params);

    var ans_product = await productModel.findByIdAndRemove(req.params.productid);
    console.log(ans_product);
    res.send({ msg: true })
})

app.put('/update-category-list/:categoryid', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var ans_product = await catModel.findByIdAndUpdate(req.params.categoryid, req.body);
    console.log(ans_product);
    res.send({ msg: true })
})

app.put('/update-product-list/:productid', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var ans_product = await productModel.findByIdAndUpdate(req.params.productid, req.body);
    res.send({ msg: true })
})

app.listen(9000);