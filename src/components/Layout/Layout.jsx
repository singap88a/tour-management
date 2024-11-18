import React from 'react'
import Header from './../Header/Header';
import Routers from '../../router/Routers';
import Footer from './../Footer/Footer';
export default function Layout() {
  return (
    <div>
      <Header/>
       <Routers/>
      <Footer/>
     </div>
  )
}
