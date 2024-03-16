import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
// import CreatePostForm from "../../components/forms/CreatePostForm";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/people";
import Link from "next/link";
import { Modal } from "antd";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  //state
  const [foodname, setFoodname] = useState("");
  const [foodType, setFoodType] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState({}); // for image
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]); // posts
  const [people, setPeople] = useState([]); //people

  //comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const [orderVisible, setOrderVisible] = useState(false);
  const [order, setOrder] = useState({});
  const [contact, setContact] = useState("");

  const router = useRouter();
  // here when the page render then the post in render and (later on) also user to follow
  useEffect(() => {
    if (state && state.token) {
      fetchUserPost(); // to fetch post
      findPeople();
    }
  }, [state && state.token]);

  // this function make a request to backend to fetch all the post of the user
  const fetchUserPost = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      // console.log("User post =>",data);
      setPosts(data);
    } catch (error) {
      console.log("ERROR while post-fetching Client => ", error);
    }
  };

  // this function if for find people and show on the sidebar (as suggestion to follow)
  const findPeople = async (req, res) => {
    // this function execute in useEffect
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (error) {
      console.log("Error while findPeople Client =>", error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Post=> ,", content);
    try {
      const { data } = await axios.post("/create-post", {
        foodname,
        content,
        foodType,
        price,
        image,
      });
      console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        //while submit the post we can use fetchPost so that post shows without refreshing
        fetchUserPost();
        toast.success("Post created");
        setFoodname("");
        setContent("");
        setFoodType("");
        setPrice("");
        setImage({});
      }
    } catch (error) {
      console.log("Error from dashboard =>", error);
    }
  };

  // Function to upload image
  const handleImage = async (e) => {
    const file = e.target.files[0]; // it could be the array
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);

    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log("Error while upload image => ", error);
      setUploading(false);
    }
  };

  // handle DETLETe post
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post Deleted");

      fetchUserPost();
    } catch (error) {
      console.log("Error while Delete image => ", error);
    }
  };

  //what hapend when we click on the follow button
  const handleFollow = async (user) => {
    // console.log("add this user to following list", user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id }); // we send only id

      //update local Storage --> update user
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state (helps when user follow it will remove from people array)
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);

      toast.success(`following ${user.name}`);
      //rerender the post in news feed
      fetchUserPost();
    } catch (error) {
      console.log("Error while handleFollow in dasboard.js => ", error);
    }
  };

  // Handle Like click(postlist)
  const handleLike = async (_id) => {
    // _id = postId
    // console.log("Like this post",_id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("liked: ",data);
      fetchUserPost(); // ones post updated then rerender the post
    } catch (error) {
      console.log("handleLIke =>", error);
    }
  };
  //Handle Unlike
  const handleUnlike = async (_id) => {
    // console.log("Unlike this post",_id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      console.log("unliked: ", data);
      fetchUserPost();
    } catch (error) {
      console.log("handleLIke =>", error);
    }
  };

  //comments
  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment to this post ID =>", currentPost._id);
    // console.log("add comment to database", feedback);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("addcomment", data);
      setComment("");
      setVisible(false);
      fetchUserPost();
    } catch (error) {
      console.log(error);
    }
  };

  //order now
  const handleOrder = (post) => {
    setOrder(post);
    setOrderVisible(true);
    console.log("The order is click on", post);
  };

  const addOrder = async (post) => {
    try {
      // You can include additional information required for the order, such as contact details
      const { data } = await axios.post("/add-order", {
        postId: post._id, // Include the post ID
        contact, // Include the contact information
      });
      console.log("your order", data);
      toast.success("Order placed successfully!"); // Notify the user that the order was placed successfully
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again."); // Notify the user of any errors
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image">
          <div className="col text-center">
            <h1 className="text-4xl font-bold text-center text-[#fff]">
              {" "}
              Your Menu
            </h1>
          </div>
        </div>

        <div className="container mx-auto mt-8 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 mx-auto">
            <CreatePostForm
              foodname={foodname}
              setFoodname={setFoodname}
              foodType={foodType}
              setFoodType={setFoodType}
              content={content}
              setContent={setContent}
              price={price}
              setPrice={setPrice}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            {/* pre tag to read json data nicely */}
            {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              handleOrder={handleOrder}
            />
            <Modal
              title="Feedback"
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <form>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write something..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={addComment}
                  className="btn btn-warning btn-block mt-3"
                >
                  {" "}
                  + Comment{" "}
                </button>
              </form>
            </Modal>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/4 mt-8 md:mt-0 md:pl-4">
            {state && state.user && state.user.following && (
              <Link href={`/user/following`} className="text-lg mb-4">
                {state.user.following.length} Bookmarking
              </Link>
            )}
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>
        {/* Modal for order */}
        <Modal
          open={orderVisible}
          onCancel={() => setOrderVisible(false)}
          footer={null}
        >
          {order && (
            <div>
              <h2>Order Details</h2>
              <p>Food Name: {order.foodname}</p>
              {order.image && order.image.url && (
                <img
                  src={order.image && order.image.url}
                  alt={order.postedBy.name}
                />
              )}
              <h1>
                Price: <span className="text-green-500">Rs.{order.price}</span>{" "}
              </h1>
              <button
                onClick={() => addOrder(order)}
                className="bg-orange-500 p-2 rounded-md text-white font-bold btn-sm mt-1"
              >
                Add to Order
              </button>
              {/* Add other order details here if needed */}
            </div>
          )}
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Home;
