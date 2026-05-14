from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr, ConfigDict


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: EmailStr
    is_active: bool
    is_verified: bool
    created_at: datetime


class AuthResponse(BaseModel):
    message: str
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
    
class RefreshRequest(BaseModel):
    refresh_token: str


class RefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"