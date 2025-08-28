const express=require('express');
const router=express.Router();

// Import the Controller

const {likePost, unLikePost}= require("../controller/LikeController");
const {createPost, getAllPosts}=require("../controller/PostController");
const {createComment}=require("../controller/CommentController");

// Mapping Create

router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unLikePost);

// export

module.exports=router;