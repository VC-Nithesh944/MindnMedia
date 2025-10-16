'use client'
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark"/>
      <Header />
      {/* we will use the below page as client side(for rendering) */}
      <BlogList />
      <Footer />
    </>
    
  );
}

//When we click on blog item descriptive blog page => for that we need to create a route => create a new folder blogs, subfolder for dynamic route [id], file name should be lowecase page.jsx
