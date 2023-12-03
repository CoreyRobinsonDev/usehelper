// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export async function GET(req: Request) {
    return Response.json({message: "Hello World!"});
}
