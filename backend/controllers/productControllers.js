const Product = require('../models/productModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

function Search(query){
    const queryStr = query.keyword ? {
        $or:[
            {name: {$regex: query.keyword,$options: "i",}},
            {category:{$regex:query.keyword,$options:"i"}},
            {company:{$regex:query.keyword,$options:"i"}},
        ]
    } : {};
    return queryStr;
}

function filter(query){
    const removeFields = ["keyword", "page", "limit"];
    let queryCopy = {...query};
    removeFields.forEach(field => delete queryCopy[field]);
    
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const filterOnQuery = JSON.parse(queryStr);
    for (let key in filterOnQuery) {
        if(typeof filterOnQuery[key] === 'string') {
            filterOnQuery[key] = { $regex: filterOnQuery[key], $options: 'i' }; 
        }
        else if (Array.isArray(filterOnQuery[key])) {
            filterOnQuery[key] = { $in: filterOnQuery[key].map(value => new RegExp(value, 'i')) };
        }
    }
    // console.log('filterOnquery: ',filterOnQuery)
    return filterOnQuery;
    
}

function pagination(resultPerPage,query){
    let currPage = Number(query.page) || 1;
    let skip = resultPerPage  * (currPage-1);
    return skip;
}

//admin
async function addProduct(req,res,next){
    const {name,description,price,imageUrl,category,company} = req.body;
    try{

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            category,
            company
        })
        
        const products = await product.save();
        res.status(201).json({
            success:true,
            products
        })
    }catch(err){
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
}

async function updateProduct(req,res,next){
    const {name,description,price,imageUrl,category,company,id} = req.body;
    try{
      const product = await Product.findOne({_id:id});
      if(product){
        product.name = name ? name : product.name;
        product.description = description ? description : product.description;
        product.price = price ? price : product.price;
        product.imageUrl = imageUrl ? imageUrl : product.imageUrl;
        product.category = category ? category : product.category;
        product.company = company ? company : product.company;
        const savedProduct = await product.save();
        res.status(201).json({success:true,message:"product updated",product:savedProduct});
      }

    }catch(err){
        res.status(500).json({success:false});
    }

}
async function deleteProduct(req,res,next){
    const id = req.params.id;
    if(!id) res.json({success:true,message:"not found"});
    try{
      const deleted =  await Product.deleteOne({_id:id});
      res.json({success:true,message:'product deleted successfully'});
    }catch(err){
        res.json({suceess:false,message:"error in deleting"});
    }   
}
//users
async function getAllProducts(req,res,next){
    try{
        const productCount = await Product.countDocuments();
        let resultPerPage = 8;
        if(req.session && req.session.user && req.session.user.role=='admin') resultPerPage = 15;
        const query= req.query;
        let queryObject = Product.find();
        // console.log('query: ',query)
  
        queryObject.find(Search(query));
        queryObject.find(filter(query));
        queryObject.limit(resultPerPage).skip(pagination(resultPerPage,query));

        const products = await queryObject.exec();
        res.status(201).json({
            success:true,
            products,
            productCount,
        })
    }catch(err){
        res.status(500).json({ message: 'Error getting all products', error: err.message});
    }
}

async function singleProduct(req,res,next){
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        else{
            res.status(200).json(product);
        }
    }catch(err){
        res.status(500).json({ message: 'Error getting product', error: err.message});
    }
}

//fetch products for cart
async function cartProducts(req, res,next){
    const { ids } = req.body;
    try {
        const products = await Product.find({ _id: { $in: ids } }); 
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}

///add reviews:
            
async function createProductReview(req,res) {
        if(!req.user) return res.json({success:false,message:'login for review'})
            const {userId} = req.user;
    const { rating, comment, productId } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) {res.json({success:false,message:'error in finding user'})};
        const product = await Product.findById(productId);
        if (!product) {
            return res.json({ message: 'Product not found' });
            }
            let review = product.reviews.find(item => item.user.toString() === userId.toString());
            const numofReviews = product.numOfReviews;
            const totalRating = numofReviews * product.ratings;
        
            if (review) {
                const oldRating = review.rating;
                review.rating = rating;
                review.comment = comment;
                product.ratings = Number(((totalRating - oldRating + Number(rating)) / numofReviews)).toFixed(1);
            }
            else{
                product.reviews.push({
                    user: userId,
                    name: user.name,
                    rating: rating,
                    comment: comment,
                });
            product.numOfReviews = numofReviews + 1;
            product.ratings = Number((totalRating + Number(rating)) / (numofReviews + 1)).toFixed(1);
        
            }
           await product.save();
           res.status(201).json({success:true,product});
        }catch(err){
            res.status(500).json({ message: 'Error creating review', error: err.message });
        }

}

async function getProductReview(req,res) {
    if(!req.user) {return res.json({success:false})};
    const {userId} = req.user;
     const { productId } = req.query;
    try {
        const user = await User.findById(userId);
        if(!user) {res.json({success:false,message:'error in finding user'})};
        const product = await Product.findById(productId);
        if (!product) {
            return res.json({ message: 'Product not found' });
            }
            let review = product.reviews.find(item => item.user == userId);
           res.status(201).json({success:true,review});
        }catch(err){
            res.status(500).json({ message: 'Error creating review', error: err.message });
        }
}

module.exports = {addProduct,getAllProducts,singleProduct,cartProducts,createProductReview,getProductReview,updateProduct,deleteProduct};