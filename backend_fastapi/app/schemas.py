from pydantic import BaseModel, Field, validator
from fastapi import Query
from .defaults import *


class QuestionBase(BaseModel):
    title: str = Field(max_length=QUESTION_TITLE_MAX_LENGTH)

# True or false question
class TrueOrFalse(QuestionBase):
    options: bool


# Multiple choice question
class MultipleChoice(QuestionBase):
    options: list[str] = ["", "", "", ""]

    # Validate that the number of options matches the number of questions
    @validator("options")
    def validate_options(cls, options, values):
        if not len(options) <= DEFAULT_MULTIPLE_CHOICE_OPTIONS:
            raise ValueError(f"For multiple choice, you must have {values['num_options']} number of options!")
        return options

class showMultipleChoice(MultipleChoice):
    class Config:
        orm_mode = True


# Written question
class Written(QuestionBase):
    response: str = Field(default="", max_length=DEFAULT_WRITTEN_ANSWER_MAX_LENGTH, min_length=DEFAULT_WRITTEN_ANSWER_MIN_LENGTH)

class ShowWritten(Written):
    class Config:
        orm_mode = True

# Feedback class. Contains a list of questions.
# class Feedback(BaseModel):
    # num_questions: int = Query(DEFAULT_NUM_QUESTIONS, le=MAX_NUM_QUESTIONS)
    # questions: list[Question]

    # Validate that the number of questions matches the number of questions
    # @validator("questions")
    # def validate_questions(cls, questions, values):
    #     if len(questions) != values["num_questions"]:
    #         raise ValueError(f"You must have {values['num_questions']} questions!")
    #     return questions

    
# class ShowFeedback(Feedback):
#     class Config:
#         orm_mode = True