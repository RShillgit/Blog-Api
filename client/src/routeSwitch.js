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
  // Server URL that can be switched to 'http://localhost:8080/' when in development or 'https://blog-api-production-1efd.up.railway.app/' in production
  const serverURL = 'https://blog-api-production-1efd.up.railway.app/';
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>} />
        <Route path="/login" element={<Login navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>} />
        <Route path="/posts" element={<Post navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>} />
        <Route path="/posts/:id" element={<IndividualPost navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>} />
        <Route path="/posts/:id/update" element={<UpdatePost navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>} />
        <Route path="*" element={<PageNotFound navbar={<Navigation />} footer={<Footer/>} serverURL={serverURL}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;