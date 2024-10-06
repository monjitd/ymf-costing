import { NextResponse} from "next/server";



export async function GET() {
    return NextResponse.json({items: [
        {id:1, title: "HELLOO"},
        {id:2, title: "HELLOO again"},
        {id:3, title: "HELLOO to be"},
    ]})
}


// export async function POST(){
//     return NextResponse.json({hello: "POST"})
// }