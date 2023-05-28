import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import endpoint from "../../config/endpoint";
import Loading from "../../components/Loading";
import moment from "moment";
import ReactPaginate from "react-paginate";
import "./pagination.css";
const PER_PAGE = 2;

function Blog() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [posts, setPosts] = useState([]);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(1000 / PER_PAGE);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `${endpoint.bloglist}?_quantity=${offset}&limit=${PER_PAGE}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPosts(data.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  const handlePageClick = ({ selected }) => {
    console.log(selected);
    setCurrentPage(selected);
  };

  return (
    <>
      <section className="container grid grid-col-1 md:grid-cols-2   lg:grid-cols-4 gap-4 py-10 px-5">
        {posts?.map((item) => (
          <div
            key={item.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-3"
          >
            <img className="w-full" src={item.image} alt={item.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">
                {item.description?.slice(0, 200)}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {moment(item.published).format("LL")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
      {posts.length === 0 && <Loading />}
      {posts.length > 0 && (
        <nav
          aria-label="Page navigation example"
          className="flex flex-col items-center m-10"
        >
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"inline-flex -space-x-px"}
            pageLinkClassName={
              "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            breakLinkClassName={
              "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            previousLinkClassName={
              "first-line: px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover: bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            nextLinkClassName={
              "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            disabledLinkClassName={"pagination__link--disabled"}
            activeLinkClassName={"pagination__active"}
          />
        </nav>
      )}
    </>
  );
}

export default Blog;
