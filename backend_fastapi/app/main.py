from fastapi import FastAPI, Depends
# from schemas import Feedback as FeedbackSchema
# from models import Feedback as FeedbackModel
from . import models, schemas
from app.database import Base, engine, SessionLocal
from sqlalchemy.orm import Session


# Create the database
Base.metadata.create_all(engine)

app = FastAPI()


# Creating access to the database session
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


# Create a question
# @app.post("/create_question")
# def create_question(question: schemas.Question, db: Session = Depends(get_session)):
#     data = models.Question(**question.dict())
#     db.add(data)
#     db.commit()
#     db.refresh(data)
#     return data


@app.post("/create_multiple_choice")
def create_multiple_choice(request: schemas.MultipleChoice, db: Session = Depends(get_session)):
    data = models.MultipleChoice(**request.dict())
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

    

@app.get("/get_all_written_multiple_choice", response_model=list[schemas.showMultipleChoice])
def get_all_multiple_choice(db: Session = Depends(get_session)):
    data = db.query(models.MultipleChoice).all()
    return data


@app.post("/create_written")
def create_written(request: schemas.Written, db: Session = Depends(get_session)):
    data = models.Written(**request.dict())
    db.add(data)
    db.commit()
    db.refresh(data)
    return data


@app.get("/get_all_written", response_model=list[schemas.ShowWritten])
def get_all_written(db: Session = Depends(get_session)):
    data = db.query(models.Written).all()
    return data












# Create a feedback
# @app.post("/create_feedback")
# def create_feedback(feedback: schemas.Feedback, question_ids: list[int] | None = [], db: Session = Depends(get_session)):
#     matched = db.query(models.Question).filter(models.Question.id == question_ids[0]).first()
#     feedback.questions.append(matched)
#     data = models.Feedback(**feedback.dict())
    
#     db.add(data)
#     db.commit()
#     db.refresh(data)
#     return data


# Get all feedbacks
# @app.get("/get_all_feedbacks")
# def test(db: Session = Depends(get_session)):
#     data = db.query(models.Feedback).all()
#     return data