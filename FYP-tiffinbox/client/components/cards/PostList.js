import renderHTML from "react-render-html";
import moment from "moment";
import { useRouter } from "next/router";
import { Avatar, Button } from "antd"; // Import Button from antd
import { imageSource } from "../../functions";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../../context";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleOrder,
  handleComment,
}) => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8"
          >
            <div className="flex items-center px-6 py-4">
              <Avatar size={40} src={imageSource(post.postedBy)} />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-800">
                  {post.postedBy.name}
                </p>
                <p className="text-sm text-gray-600">
                  {moment(post.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{post.foodname}</div>
              <div className="text-gray-700 text-base mb-2">
                {post.foodType}
              </div>
              <div className="text-gray-700 text-base mb-2">
                Price: {post.price}
              </div>
              <div className="text-gray-700 text-base mb-4">
                {renderHTML(post.content)}
              </div>
              {post.image && (
                <div
                  className="h-64 bg-cover bg-center mb-4"
                  style={{ backgroundImage: `url(${post.image.url})` }}
                ></div>
              )}
              <div className="flex items-center">
                <button
                  onClick={() =>
                    post.like.includes(state.user?._id)
                      ? handleUnlike(post._id)
                      : handleLike(post._id)
                  }
                  className="mr-4"
                >
                  {post.like.includes(state.user._id) ? (
                    <HeartFilled className="text-red-500 text-2xl cursor-pointer" />
                  ) : (
                    <HeartOutlined className="text-gray-500 text-2xl cursor-pointer" />
                  )}
                  <span className="ml-1 text-sm">{post.like.length}</span>
                </button>
                <button className="mr-4">
                  <CommentOutlined
                    onClick={() => handleComment(post)}
                    className="text-gray-500 text-2xl cursor-pointer"
                  />
                  <span className="ml-1 text-sm">4 comments</span>
                </button>
                {/* Render 'Order Now' button if the post doesn't belong to the logged-in user */}
                {!state.user || state.user._id !== post.postedBy._id ? (
                  <Button
                    className="bg-[#fcb100] font-bold text-center text-[#fff]"
                    onClick={() => handleOrder(post)}
                  >
                    Order Now
                  </Button>
                ) : (
                  // Render 'Edit' and 'Delete' buttons for the logged-in user's posts
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-red-500 text-2xl cursor-pointer mr-4"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-red-500 text-2xl cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
