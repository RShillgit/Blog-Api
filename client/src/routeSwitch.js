import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import IndividualPost from "./components/individualPost";
import Login from "./components/login";
import Post from "./components/post";
import UpdatePost from "./components/updatePost";


const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts/:id" element={<IndividualPost />} />
        <Route path="/posts/:id/update" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;