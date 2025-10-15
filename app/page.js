'use client'
import BlogItem from "@/components/BlogItem";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      {/* we will use the below page as client side(for rendering) */}
      <BlogItem/> 
    </>
    
  );
}
