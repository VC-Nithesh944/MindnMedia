//Apis to manage blog data
//get post delete put

import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  try {
    const formData = await request.formData();

    // Guard: ensure Cloudinary config present
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary env vars.");
      return NextResponse.json(
        {
          success: false,
          msg: "Server misconfigured: missing Cloudinary env vars",
        },
        { status: 500 }
      );
    }

    const image = formData.get("image"); // can be File or string path/url
    let imgUrl = "";

    if (image && typeof image === "object" && image.name) {
      // File object -> upload to Cloudinary and save secure_url
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadFromBuffer = (buffer) =>
        new Promise((resolve, reject) => {
          const folder = process.env.CLOUDINARY_FOLDER || "mindnmedia";
          try {
            const stream = cloudinary.uploader.upload_stream(
              { folder, resource_type: "auto" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            streamifier.createReadStream(buffer).pipe(stream);
          } catch (err) {
            reject(err);
          }
        });

      try {
        const result = await uploadFromBuffer(buffer);
        imgUrl = result.secure_url; // Cloudinary public URL (use as-is)
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return NextResponse.json(
          {
            success: false,
            msg: "Image upload failed",
            error: String(uploadErr),
          },
          { status: 500 }
        );
      }
    } else if (image && typeof image === "string") {
      // string URL provided by client -> save it unchanged
      imgUrl = image;
    } else {
      imgUrl = ""; // no image provided
    }

    const authorImgVal = formData.get("authorImg") || "/author_img.png";

    const blogData = {
      title: `${formData.get("title") || ""}`,
      description: `${formData.get("description") || ""}`,
      category: `${formData.get("category") || ""}`,
      author: `${formData.get("author") || ""}`,
      image: imgUrl,
      authorImg: authorImgVal,
    };

    console.log("blogData to save:", blogData);
    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog Added Successfully",
      blog: blogData,
    });
  } catch (err) {
    console.error("POST /api/blog error:", err);
    return NextResponse.json(
      { success: false, msg: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}

//Creating API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted Successfully" });
  } catch (err) {
    console.error("DELETE /api/blog error:", err);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}
