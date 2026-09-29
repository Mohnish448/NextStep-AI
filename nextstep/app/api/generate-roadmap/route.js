import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body = await req.json();

        //calling karina AI API from KarinaAI (python) to generate roadmap
        const response = await fetch("http://127.0.0.1:8000/generate-roadmap", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",},
                body: JSON.stringify({user_input : body.user_input}),
            });
         
            const data = await response.json();

            return NextResponse.json(data);

        }  catch(error){
            return NextResponse.json({error : error.message});
        }
        }