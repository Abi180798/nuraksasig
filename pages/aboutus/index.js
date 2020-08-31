import Navbar from "../layouts/Navbar";
import Header from "../layouts/Header";
import Content from "./components/Content";
import Head from "next/head";

export default function AboutUs(){
    return(
        <div>
      <Head>
        <title>About Us-TAHURA NURAKSA</title>
        <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main id="page-top">
        <Navbar/>
        {/* <Header/> */}
        <Content/>
      </main>

      <footer>
        
      </footer>
    </div>
    )
}