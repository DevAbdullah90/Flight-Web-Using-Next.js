from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import os
from connection import config
from agents import Agent, Runner, function_tool
import requests

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@function_tool
def get_flights(origin: str, destination: str, date: str):
    """
    Get flight offers for a given origin, destination, and date.
    Args:
        origin: The 3-letter IATA code for the origin airport (e.g., 'NYC').
        destination: The 3-letter IATA code for the destination airport (e.g., 'LON').
        date: The date of travel in YYYY-MM-DD format.
    """
    client_id = os.getenv("AMADEUS_CLIENT_ID")
    client_secret = os.getenv("AMADEUS_CLIENT_SECRET")
    
    if not client_id or not client_secret:
        return "Error: Amadeus API credentials not found."

    # Authenticate
    auth_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
    auth_response = requests.post(
        auth_url,
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    if auth_response.status_code != 200:
        return f"Error authenticating with Amadeus: {auth_response.text}"
        
    token = auth_response.json().get("access_token")
    
    # Search Flights
    search_url = "https://test.api.amadeus.com/v2/shopping/flight-offers"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "originLocationCode": origin,
        "destinationLocationCode": destination,
        "departureDate": date,
        "adults": 1,
        "max": 5
    }
    
    response = requests.get(search_url, headers=headers, params=params)
    
    if response.status_code != 200:
        return f"Error fetching flights: {response.text}"
        
    data = response.json()
    
    if not data.get("data"):
        return "No flights found."
        
    flights = []
    for offer in data["data"]:
        price = offer["price"]["total"]
        currency = offer["price"]["currency"]
        itineraries = []
        for it in offer["itineraries"]:
            segments = []
            for seg in it["segments"]:
                segments.append(f"{seg['carrierCode']}{seg['number']} ({seg['departure']['iataCode']}->{seg['arrival']['iataCode']})")
            itineraries.append(" -> ".join(segments))
        flights.append(f"Price: {price} {currency}, Route: {' | '.join(itineraries)}")
        
    return "\n".join(flights)


flight_agent = Agent(
    name="Flight Agent",
    instructions="You are a flight agent. You help users find flights. Use the get_flights tool to find flight options.",
    tools=[get_flights],
)

@app.post("/query")
async def query_agent(request: QueryRequest):
    try:
        run = await Runner.run(flight_agent, request.query, run_config=config)
        return {"response": run.final_output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "Flight Agent Backend is running"}