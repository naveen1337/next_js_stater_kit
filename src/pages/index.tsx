import Head from 'next/head'
import Image from 'next/image'
import Home from "../page_routes/Home"

export default function HomePageIndex(props:any) {
  return <Home hello={props.hello}/>
}

export async function getServerSideProps() {
  return {props:{
      "hello":"world"
  }}
}