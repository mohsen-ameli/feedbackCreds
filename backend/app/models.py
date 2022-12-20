from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base
from .defaults import *



class Written(Base):
    __tablename__ = 'written'

    id = Column(Integer, primary_key=True)
    title = Column(String(QUESTION_TITLE_MAX_LENGTH))
    response = Column(String(DEFAULT_WRITTEN_ANSWER_MAX_LENGTH))


class MultipleChoice(Base):
    __tablename__ = 'multiple_choice'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(QUESTION_TITLE_MAX_LENGTH))
    options = Column(String(256))


class TrueOrFalse(Base):
    __tablename__ = 'true_or_false'
    id = Column(Integer, primary_key=True)
    options = Column(String(100))



# Child class
# class Question(Base):
#     __tablename__ = 'question'

#     id = Column(Integer, primary_key=True, index=True)
#     question_title = Column(String(QUESTION_TITLE_MAX_LENGTH))
#     question_body = Column(String(QUESTION_BODY_MAX_LENGTH))
#     feedback_id = Column(Integer, ForeignKey("feedback.id"))

#     written = relationship("Written", back_populates="questions")
#     feedback = relationship("Feedback", back_populates="questions")


# Parent class
# class Feedback(Base):
#     __tablename__ = 'feedback'

#     id = Column(Integer, primary_key=True, index=True)
    # num_questions = Column(Integer)

    # questions = relationship("Question", back_populates="feedback")