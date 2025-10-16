import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { blog_data } from "@/assets/assets";
import axios from "axios";

const BlogList = () => {
  //When i click on category it should display only that category, for lets create a state variable (We will use filter method in map context of blogdata)
  const [menu, setMenu] = useState("All");

  //We will not be using blog_data import anymore, rather we will hit the api and store the blog data into a state variable and then display it as we did for this
  const [blogs, setBlogs] = useState([]);

  //function to fetchBlogs to hit the api
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);

    //to test whether the data is getting saved or not
    console.log(response.data.blogs);
    //blogs array will be stored in Blogs state
  };

  //whenever this component gets loaded we need to run this function
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }>
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }>
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }>
          Startup
        </button>
        <button
          onClick={() => setMenu("LifeStyle")}
          className={
            menu === "LifeStyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }>
          LifeStyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 ">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item._id} //change id to _id
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            );
          })}
      </div>
    </div>
  );
};

//But when i click on the Blog, it will not show the page, because we are fetching data based on id (blog_data) and here we are passing object Id in the blogs\[id]. 

export default BlogList;
