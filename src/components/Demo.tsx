import { useLazyGetSummaryQuery } from "@/services/article";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { CopyOutlined, LinkOutlined, CheckOutlined } from "@ant-design/icons";

const Demo = () => {
  const [getSummary, { data, error, isLoading }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState<string | null>(null);
  const [article, setArticle] = useState<{ url: string; summary: string }>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<
    { url: string; summary: string }[]
  >([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );
    if (existingArticle) {
      setArticle(existingArticle);
      return;
    }

    try {
      const { data } = await getSummary({ articleUrl: article.url });
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    }
  };

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(null), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleArticleClick = (item: { url: string; summary: string }) => {
    setArticle(item);
  };

  return (
    <section className="flex flex-col items-center gap-4 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 text-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-300 dark:border-gray-600 max-w-lg w-full"
      >
        <LinkOutlined className="text-gray-500 dark:text-gray-400 text-2xl" />
        <input
          type="url"
          placeholder="Paste the article link"
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-200 rounded-lg px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          <CopyOutlined className="text-white dark:text-gray-200" />
        </button>
      </form>

      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto w-full">
        {allArticles.reverse().map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => handleArticleClick(item)}
            className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div
              className="flex items-center justify-center w-6 h-6 cursor-pointer"
              onClick={() => handleCopy(item.url)}
            >
              {copied === item.url ? (
                <CheckOutlined className="text-green-500 dark:text-green-400" />
              ) : (
                <CopyOutlined className="text-gray-500 dark:text-gray-400" />
              )}
            </div>
            <p className="flex-1 text-blue-700 dark:text-blue-400 font-medium text-sm truncate">
              {item.url}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 max-w-lg w-full">
        {isLoading && <Spin />}
        {error && <p className="text-red-500">Ops! There is an error!</p>}
        {article.summary && (
          <div className="outline outline-1 py-5 px-8 rounded-xl dark:outline-gray-600">
            <h2 className="text-xl font-bold dark:text-white">Summary:</h2>
            <p className="leading-relaxed dark:text-gray-300">
              {article.summary}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
