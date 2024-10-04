import getDomain from "@/app/lib/getDomain"

//fetch caching options

//force-cache

//revalidate: n seconds

//no-store

async function getData() {
    //1 endpoint - API ?
    const domain = getDomain()
    const endpoint = `${domain}/api/posts`
    // const res = await fetch(endpoint, {next: {revalidate: 10 }})
    const res = await fetch(endpoint, {cache: 'no-store'})

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    if (res.headers.get("content-type" !== "application/json")) {
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
        <h2>Posts:</h2>
        {items && items.map((item, idx)=>{
                return <li key={`post-${idx}`}>{item.title}</li>
            })
        }
    </main>
}