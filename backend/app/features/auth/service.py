from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.features.auth.models import User
from app.features.auth.schemas import RegisterRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
)


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, data: RegisterRequest) -> User:
    if get_user_by_email(db, data.email):
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def generate_tokens(user: User) -> dict:
    data = {"sub": str(user.id)}
    return {
        "access_token": create_access_token(data),
        "refresh_token": create_refresh_token(data),
    }
    
def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()