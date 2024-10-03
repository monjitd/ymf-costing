import { NextResponse} from "next/server";



export async function GET(request, context) {
    const {params} = context
    const {slug} = params
    console.log(request, console)
    return NextResponse.json({slug: slug})
}