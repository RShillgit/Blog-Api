import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import IndividualPost from "./components/individualPost";
import Login from "./components/login";
import Navigation from "./components/navigation";
import PageNotFound from "./components/pageNotFound";
import Post from "./components/post";
import UpdatePost from "./components/updatePost";



const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App navbar={<Navigation />} />} />
        <Route path="/login" element={<Login navbar={<Navigation />} />} />
        <Route path="/posts" element={<Post navbar={<Navigation />} />} />
        <Route path="/posts/:id" element={<IndividualPost navbar={<Navigation />} />} />
        <Route path="/posts/:id/update" element={<UpdatePost navbar={<Navigation />} />} />
        <Route path="*" element={<PageNotFound navbar={<Navigation />} />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;