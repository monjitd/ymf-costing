import getDomain from "@/app/lib/getDomain"

import BlogCard from './card'


async function getData() {
    //1 endpoint - API ?
    const domain = getDomain()
    const endpoint = `${domain}/api/posts`
    console.log("endpoint:", endpoint)
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
    const items = data && data.items ? [...data.items] : []
    console.log(items)
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)

    return <main>
        <h1>Hello Monjit</h1>
        <p>Posts:</p>
        {items && items.map((item, idx)=>{
                // return <BlogCard title={item.title} key={`post-${idx}`} />
                return <li key={`post-${idx}`}>{item.title}</li>
            })
        }
    </main>
}