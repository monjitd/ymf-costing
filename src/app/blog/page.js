

import getDomain from "@/app/lib/getDomain"

import BlogCard from './card'

import { helloWorld } from "@/app/lib/db"

async function getData() {
    //1 endpoint - API ?
    const domain = getDomain()
    const endpoint = `${domain}/api/posts`

    // const res = await fetch(endpoint, {next: {revalidate: 10 }})
    const res = await fetch(endpoint, {cache: 'no-store'})

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    if (res.headers.get("content-type") !== "application/json") {
        return {items: []}
    }
    return res.json()
}



export default async function BlogPage(){
    const data = await getData()

    const dbHello = await helloWorld()
    console.log('dbHello', dbHello)
    const items = data && data.items ? [...data.items] : []

    return <main>
        <h1>Hello Monjit</h1>
        <p>DB Response: {JSON.stringify(dbHello)}</p>
        <p>Posts:</p>
        {items && items.map((item, idx)=>{
                return <BlogCard key={`post-${idx}`} title={item.title} />
                // return <li key={`post-${idx}`}>{item.title}</li>
            })
        }
    </main>
}

export const runtime = 'edge' //else defaults to nodejs
export const preferredRegion = "iad1" //else auto