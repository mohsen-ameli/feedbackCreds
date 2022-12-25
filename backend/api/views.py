from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Feedback, Question, CustomUser
from .serializers import QuestionSerializer, UserSerializer, FeedbackSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt


# API Overview
@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'Question List': '/<int:feed_pk>/questions/',
        'Question Create': '/<int:feed_pk>/questions/',

        'Question Detail View': '/<int:feed_pk>/questions/<int:pk>/',
        'Question Update': '/<int:feed_pk>/questions/<int:pk>/',
        'Question Delete': '/<int:feed_pk>/questions/<int:pk>/',

        "--------------": "--------------",
        'Feedback List': '/feedbacks/',
        'Feedback Create': '/feedbacks/',

        'Feedback Detail View': '/feedbacks/<int:pk>/',
        'Feedback Update': '/feedbacks/<int:pk>/',
        'Feedback Delete': '/feedbacks/<int:pk>/',

        "----------------": "--------------",
        'Feedback\'s Questions': '/feedback/<int:pk>/questions/',

        "---------------": "--------------",
        'get-user': '/get-user/<int:pk>/'
    }
    return Response(api_urls)


# ----------------- QUESTION ----------------- #

# Listing all the questions
@csrf_exempt
@api_view(['GET', 'POST'])
def handle_questions(request, feed_pk):
    # GET
    if request.method == 'GET':
        # TODO: Query the questions based on the feedback based on the useer
        questions = Question.objects.filter(feedback=feed_pk)
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
@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def handle_question(request, feed_pk, pk):
    # GET
    if request.method == 'GET':
        question = Question.objects.filter(feedback=feed_pk).get(pk=pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    # PUT
    elif request.method == 'PUT':
        question = Question.objects.filter(feedback=feed_pk).get(pk=pk)
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
        question = Question.objects.filter(feedback=feed_pk).get(pk=pk)
        question.delete()
        return Response({"message": "Question deleted successfully"})


# ----------------- FEEDBACK ----------------- #

@csrf_exempt
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


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def handle_feedback(request, pk):
    # GET
    if request.method == 'GET':
        feedback = Feedback.objects.get(pk=pk)
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)

    # PUT
    elif request.method == 'PUT':
        feedback = Feedback.objects.get(pk=pk)
        serializer = FeedbackSerializer(feedback, data=request.data)

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
        feedback = Feedback.objects.get(pk=pk)
        feedback.delete()
        return Response({"message": "Feedback deleted successfully"})


# ----------------- FEEDBACK'S QUESTIONS ----------------- #

@api_view(['GET'])
def get_feedback_questions(request, pk):
    try:
        feedback = Feedback.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({"message": "Feedback does not exist"}, status=400)
    questions = Question.objects.filter(feedback=feedback)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


# ----------------- USER ----------------- #

# Getting the user's information
@api_view(['GET'])
def get_user(request, pk):
    user = CustomUser.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)