//Apis to manage blog data
//get post delete put

import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");
//we will create api to store blog data in database, we will use model and config file

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

//API Endpoints to get All Blogs
export async function GET(request) {
  //We will use the GET method in two ways:
  //if we hit this through home page then we should get all blog Data
  //if we hit this through content page then we should get particular blog Content

  //send blog id to backend using parameters, from frontend, the if handles two way using, if its there then only
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    //return would break this function early
    return NextResponse.json(blog);
  } else {
    //{} would find all the blogs and store it in the variable
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API Endpoint for Uploading Blogs
export async function POST(request) {
  //we will get blog data as formdata to store in db
  const formData = await request.formData(); //from our req will be stored

  //get time data
  const timestamp = Date.now();

  const image = formData.get("image"); //we will use same field name while sending image
  //Logic to store the image in public folder for that we need convert to bytedata
  const imageByteData = await image.arrayBuffer();
  //we will extract the buffer from bytedata
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`; //timestamp will make it unique
  await writeFile(path, buffer);

  const imgUrl = `/${timestamp}_${image.name}`;

  //To test this function
  //console.log(imgUrl);

  //Taking different category like authorname and store it in database

  const authorImgVal = formData.get("authorImg") || "/author_img.png";
  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: authorImgVal,
  };
  console.log(blogData);
  //To save the data in the Database
  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added Successfully" });

  //This API is working perfectly fine
}

//Creating API Endpoint to delete Blog
export async function DELETE(request) {
  //we need id, fetch from frontend
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  //To delete image from public folder
  fs.unlink(`./public/${blog.image}`, () => { });
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted Successfully"})

}
