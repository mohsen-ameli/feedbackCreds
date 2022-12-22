from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Feedback, Question, CustomUser
from .serializers import QuestionSerializer, UserSerializer, FeedbackSerializer


# API Overview
@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': '/questions/',
        'Create': '/questions/',
        'Detail View': '/questions/<int:pk>/',
        'Update': '/questions/<int:pk>/',
        'Delete': '/questions/<int:pk>/',
        'get-user': '/get-user/<int:pk>/'
    }
    return Response(api_urls)


# ----------------- QUESTION ----------------- #

# Listing all the questions
@api_view(['GET', 'POST'])
def handle_questions(request):
    # GET
    if request.method == 'GET':
        # TODO: Query the questions based on the feedback based on the useer
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
    # POST
    elif request.method == 'POST':
        # Serializing the data
        serializer = QuestionSerializer(data=request.data)
        
        # Validating the data
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({"message": e.detail}, status=400)
        
        # Saving the data
        serializer.save()
        return Response(serializer.data)


# Handling a single question
@api_view(['GET', 'PUT', 'DELETE'])
def handle_question(request, pk):
    # GET
    if request.method == 'GET':
        question = Question.objects.get(pk=pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    # PUT
    elif request.method == 'PUT':
        question = Question.objects.get(pk=pk)
        serializer = QuestionSerializer(question, data=request.data)

        # Validating the data
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({"message": e.detail}, status=400)
        
        # Saving the data
        serializer.save()
        return Response(serializer.data)

    # DELETE
    elif request.method == 'DELETE':
        question = Question.objects.get(pk=pk)
        question.delete()
        return Response({"message": "Question deleted successfully"})


# Getting the number of questions
@api_view(['GET'])
def number_of_questions(request):
    questions = Question.objects.all().count()
    return Response({"number_of_questions": questions})


# ----------------- Feedback ----------------- #

@api_view(['GET', 'POST'])
def handle_feedbacks(request):
    # GET
    if request.method == 'GET':
        # TODO: change to only query feedbacks that the user has
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)
    
    # POST
    elif request.method == 'POST':
        # Serializing the data
        serializer = FeedbackSerializer(data=request.data)
        
        # Validating the data
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({"message": e.detail}, status=400)
        
        # Saving the data
        serializer.save()
        return Response(serializer.data)


# ----------------- USER ----------------- #

# Getting the user's information
@api_view(['GET'])
def get_user(request, pk):
    user = CustomUser.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)