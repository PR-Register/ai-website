
"use client";

import { use, useEffect, useState } from "react";
import Footer_01 from "@/components/footer/Footer_01";
import Header_01 from "@/components/header/Header_01";
import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const STRAPI_BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.hidental.com").replace(/\/$/, "");
        const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
        const headers = STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {};

        const res = await fetch(`${STRAPI_BASE}/api/articles?populate=*`, { headers });
        if (!res.ok) {
          console.error("Strapi fetch error:", res.status, await res.text());
          setArticles([]);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setArticles(json?.data ?? []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Header_01 />
      <main className="main-wrapper relative overflow-hidden">
        <section id="section-breadcrumb">
          <div className="breadcrumb-wrapper">
            <div className="global-container">
              <div className="breadcrumb-block">
                <h1 className="breadcrumb-title">Our Blog</h1>
                <ul className="breadcrumb-nav">
                  <li><Link href="/">Home</Link></li>
                  <li>Our Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-section">
          <div className="pb-40 xl:pb-[220px]">
            <div className="global-container">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-[1fr,minmax(416px,_0.45fr)]">
                <div className="flex flex-col gap-y-10 lg:gap-y-14 xl:gap-y-20">
                  {loading ? (
                    <p>Loading articles...</p>
                  ) : articles.length === 0 ? (
                    <p>No articles found.</p>
                  ) : (
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {articles.map((item) => {
                        const cover = item.cover;
                        const coverUrl = cover?.formats?.large?.url
                          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${cover.formats.large.url}`
                          : cover?.url
                          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${cover.url}`
                          : "/assets/img_placeholder/th-1/blog-main-1.jpg";

                        const publishedAt = item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString()
                          : "N/A";

                        return (
                          <li key={item.id} className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
                            <Link href={`/blog-details?slug=${item.slug}`} className="block overflow-hidden">
                              <Image
                                src={coverUrl}
                                alt={cover?.alternativeText || item.title}
                                width={cover?.width || 856}
                                height={cover?.height || 540}
                                className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
                              />
                            </Link>
                            <div className="border border-[#EAEDF0] p-[30px]">
                              <ul className="flex flex-wrap items-center gap-6">
                                <li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
                                  <span className="hover:text-colorOrangyRed">General</span>
                                </li>
                                <li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
                                  <span className="hover:text-colorOrangyRed">{publishedAt}</span>
                                </li>
                              </ul>
                              <h5 className="mb-3 mt-7 hover:text-colorOrangyRed">
                                <Link href={`/blog-details?slug=${item.slug}`}>{item.title}</Link>
                              </h5>
                              <p className="mb-7 line-clamp-2 last:mb-0">{item.description}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <aside className="jos flex flex-col gap-y-[30px]">
                  {/* Sidebar components can stay the same */}
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer_01 />
    </>
  );
};

export default Blog;
