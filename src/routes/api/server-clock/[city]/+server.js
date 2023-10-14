import { json } from "@sveltejs/kit";
export async function GET({params}){
    const city = params.city;
    const time = new Date();
    return json({city,time});
}