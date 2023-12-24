import Head from 'next/head'
import Image from 'next/image'
import Home from "../page_routes/Home"

export default function HomePageIndex(props:any) {

  function createView(){
    console.log('q')
  }



  return <Home createView={createView} hello={props.hello}/>
}

export async function getServerSideProps() {
  return {props:{
      "hello":"world"
  }}
}