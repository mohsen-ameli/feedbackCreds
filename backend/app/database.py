from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./sqlite3.db"
# Use this line for other databases
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

# Create sqlite engine instance
# The connect_args is only needed for sqlite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create session local class for session maker
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

# Create declaritive base meta instance
Base = declarative_base()