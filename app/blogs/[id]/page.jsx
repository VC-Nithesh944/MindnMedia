"use client";
import { assets, blog_data } from "@/assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    // for (let i = 0; i < blog_data.length; i++) {
    //   {
    //     /* Params.id is a string and the other is number, so covert to same */
    //   }
    //   if (Number(params.id) === blog_data[i].id) {
    //     setData(blog_data[i]);
    //     console.log(blog_data[i]);
    //     break;
    //   }
    // }

    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    console.log(response.data);
    setData(response.data);
  };
  {
    /* To use useEffect we have declare it as client */
  }
  useEffect(() => {
    fetchBlogData();
  }, []);
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        {/* I have given id bcz the dyn folder name is id, if write /blogs/number, i will be getting the number on the screen */}
        {/* {params.id} */}
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="logo"
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt="arrow_icon" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto ">
            {data.title}
          </h1>
          <Image
            src={data.authorImg}
            width={60}
            height={60}
            alt="main_img"
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto ">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt="main_img"
          className="border-4 border-white"
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction: </h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step1: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step1: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step1: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea
          non quibusdam porro hic aspernatur nulla. Architecto, ab odio beatae
          labore officiis recusandae amet maxime quaerat ipsa. Quae, incidunt
          consectetur.
        </p>
        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this Article on Social Media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="facebook" />
            <Image src={assets.twitter_icon} width={50} alt="twitter" />
            <Image src={assets.googleplus_icon} width={50} alt="googleplus" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
