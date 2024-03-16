import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

const CreatePostForm = ({
  foodname,
  setFoodname,
  content,
  setContent,
  price,
  setPrice,
  foodType,
  setFoodType,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <form>
          <div className="mb-4">
            <label
              htmlFor="foodName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Food Name:
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={foodname}
              onChange={(e) => setFoodname(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="foodContent"
              className="block text-gray-700 font-semibold mb-2"
            >
              Food Content:
            </label>
            <textarea
              type="text"
              id="foodContent"
              name="foodContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="foodType"
              className="block text-gray-700 font-semibold mb-2"
            >
              Food Type:
            </label>
            <select
              id="foodType"
              name="foodType"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            >
              <option value="" disabled selected>
                Select Food Type
              </option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-semibold mb-2"
            >
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
        </form>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg">
        <button
          onClick={postSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer transition duration-300"
        >
          Post
        </button>
        <label htmlFor="fileInput" className="flex items-center cursor-pointer">
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mr-2" />
          ) : uploading ? (
            <LoadingOutlined className="mr-2" />
          ) : (
            <CameraOutlined className="mr-2" />
          )}
          <span className="text-sm font-medium text-gray-700">
            Upload Image
          </span>
          <input
            id="fileInput"
            onChange={handleImage}
            type="file"
            accept="images/*"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default CreatePostForm;
