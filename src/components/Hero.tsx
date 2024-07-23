import React from "react";

const Hero = () => {
  return (
    <section className="text-center flex flex-col gap-10">
      <h1 className="text-black dark:text-white font-bold lg:text-4xl md:text-3xl text-2xl">
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-cyan to-accent-purple">
          SummarEase
        </span>
        <br />
        Your Ultimate Content Summarization Tool.
      </h1>
      <p className="max-w-[800px] leading-relaxed tracking-wide font-normal text-neutral-800 dark:text-neutral-300">
        SummarEase transforms lengthy articles, blogs, and site content into
        concise, easy-to-read summaries. Our advanced algorithm ensures you get
        the key points and insights without the fluff. Save time and stay
        informed with SummarEase, your ultimate tool for efficient content
        consumption.
      </p>
    </section>
  );
};

export default Hero;
