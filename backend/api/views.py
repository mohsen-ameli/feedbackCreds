from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Feedback, Question, CustomUser, FeedbackResponse
from .serializers import QuestionSerializer, UserSerializer, FeedbackSerializer, FeedbackResponseSerializer
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
        'Feedback\'s Questions list': '/feedback/<int:pk>/questions/',
        'New Feedback!': '/feedback/<int:pk>/questions/',

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


# ----------------- FEEDBACK RESPONSE ----------------- #

######## You could split this up into two views, but for restful purposes, I left it as one ########
# List all feedback responses, or create a new feedback response
@csrf_exempt
@api_view(['GET', 'POST'])
def handle_feedback_responses(request, pk):
    # GET
    if request.method == 'GET':
        responses = FeedbackResponse.objects.filter(feedback=pk)
        serializer = FeedbackResponseSerializer(responses, many=True)
        if serializer.data == []:
            return Response({"message": "Invalid feedback id!"}, status=404)
        return Response(serializer.data)

    # POST
    elif request.method == 'POST':
        try:
            FeedbackResponse.objects.create(feedback=Feedback.objects.get(pk=pk))
        except Exception as e:
            return Response({"message": e}, status=400)

        return Response({"message": "Feedback response created successfully"})


# GET and PUT for a single feedback response (filled response)
@api_view(['GET', 'POST'])
def handle_feedback_response(request, uuid):
    # Validating that the FeedbackResponse exists
    try:
        response_obj = FeedbackResponse.objects.get(id=uuid)
    except ObjectDoesNotExist:
        return Response({"message": "Invalid QRCode!"}, status=400)

    feedback = response_obj.feedback

    # GET
    if request.method == 'GET':
        questions = Question.objects.filter(feedback=feedback)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
    # PUT
    elif request.method == 'PUT':
        # TODO: 1: check if the feedback pk and qr code represent the same Feedback
        # The feedback object
        # feedback = Feedback.objects.get(pk=pk)

        # Serializing the data
        serializer = FeedbackResponseSerializer(feedback, request.data)

        # Validating the data
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({"message": e.detail}, status=400)

        # {"feedback": 1}

        # TODO: 2: Check if the QRCode has expired (if the user has already submitted their feedback)
        # user = CustomUser.objects.get(pk=pk)

        # if user.is_business:
        #     print("User is a business", uuid)
        # else:
        #     print("User is a customer", uuid)

        # TODO: If the user is bussiness, return an empty object of FeedbackResponse, with qr code filled
        # If the user is a customer, return the same object of FeedbackResponse, BUT with response filled
        # For the customer to be allowed to fill the response, the qr code must be valid (Not used yet). so just check if the response is full
        
        return Response({})


# Getting the feedback of the FeedbackResponse based on its uuid
@api_view(['GET'])
def get_feedback_from_uuid(request, uuid):
    try:
        feedback = FeedbackResponse.objects.get(id=uuid).feedback
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({"message": "Invalid feedback!"}, status=400)


# ----------------- USER ----------------- #

# Getting the user's information
@api_view(['GET'])
def get_user(request, pk):
    user = CustomUser.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)