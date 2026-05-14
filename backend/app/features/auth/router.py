from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.schemas import RegisterRequest, LoginRequest, UserResponse, AuthResponse
from app.features.auth.service import create_user, authenticate_user, generate_tokens
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    user = create_user(db, data)
    return user


@router.post("/login", response_model=AuthResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    tokens = generate_tokens(user)
    return AuthResponse(
        message="Login exitoso",
        access_token=tokens["access_token"],
        refresh_token=tokens["refresh_token"],
        user=user
    )