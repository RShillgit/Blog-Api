import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Footer from "./components/footer";
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
        <Route path="/" element={<App navbar={<Navigation />} footer={<Footer/>}/>} />
        <Route path="/login" element={<Login navbar={<Navigation />} footer={<Footer/>} />} />
        <Route path="/posts" element={<Post navbar={<Navigation />} footer={<Footer/>} />} />
        <Route path="/posts/:id" element={<IndividualPost navbar={<Navigation />} footer={<Footer/>} />} />
        <Route path="/posts/:id/update" element={<UpdatePost navbar={<Navigation />} footer={<Footer/>} />} />
        <Route path="*" element={<PageNotFound navbar={<Navigation />} footer={<Footer/>} />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;