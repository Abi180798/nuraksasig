import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'
import {Button} from 'react-bootstrap'
import Navbar from './layouts/Navbar'
import Header from './layouts/Header'
import Wisata from './components/Wisata'
import Event from './components/Event'
import Kontak from './components/Kontak'

function Home() {
    return (
        <div>
      <Head>
        <title>Home-TAHURA NURAKSA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
        <script src="../static/js.scripts.js"></script>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main id="page-top">
        <Navbar/>
        <Header/>
        <Wisata/>
        <Event/>
        <Kontak/>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}

// export async function getStaticProps() {
//     const res = await fetch('https://tahuraevent.herokuapp.com/event/getall')
//     const events = await res.json()
//     console.log("woooo",events)
//     return {
//       props: {
//          events:"haha"
//       },
//     }
//   }

  export default Home
