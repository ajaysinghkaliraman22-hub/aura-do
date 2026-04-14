from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import tasks

app = FastAPI(title="Aura-Do API")

# Configure CORS for our Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
