from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Feedback, Question, FeedbackResponse
from .serializers import QuestionSerializer, FeedbackSerializer, FeedbackResponseSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# API Overview
@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'Token': '/token/',
        'Token Refresh': '/token/refresh/',
        "---------------": "--------------",
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
        'Feedback\'s Question List': '/feedback-response/<uuid:uuid>/',
        'Feedback\'s Question Update': '/feedback-response/<uuid:uuid>/',

        'Feedback response List': '/feedback-responses/<int:feed_pk>/',
        'Feedback response Create': '/feedback-responses/<int:feed_pk>/',

        "---------------": "--------------",
        'get-user': '/get-user/<int:pk>/'
    }
    return Response(api_urls)


# ----------------- CUSTOM TOKEN CLAIMS JWT ----------------- #

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_business'] = user.is_business
        token['tier'] = user.tier
        token['credit'] = user.credit
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ----------------- QUESTION ----------------- #

# Listing all the questions
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
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
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
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


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
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
# List all feedback responses, or create a new one
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def handle_feedback_responses(request, feed_pk):
    # GET (For bussinesses to see their feedback responses)
    if request.method == 'GET':
        responses = FeedbackResponse.objects.filter(feedback=feed_pk)
        serializer = FeedbackResponseSerializer(responses, many=True)
        # if serializer.data == []:
        #     return Response({"message": "Invalid feedback id!"}, status=404)
        return Response(serializer.data)

    # POST (For the customer to create a new feedback response)
    elif request.method == 'POST':
        try:
            FeedbackResponse.objects.create(feedback=Feedback.objects.get(pk=feed_pk))
        except Exception as e:
            return Response({"message": e}, status=400)

        return Response({"message": "Feedback response created successfully"})


# GET and PUT for a single feedback response (filled response)
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def handle_feedback_response(request, uuid):
    # Validating that the FeedbackResponse exists (QRCode is valid)
    try:
        response_obj = FeedbackResponse.objects.get(id=uuid)
    except ObjectDoesNotExist:
        return Response({"message": "Invalid QRCode!"}, status=400)

    feedback = response_obj.feedback

    # GET (Questions based on the feedback property of FeedbackResponse)
    if request.method == 'GET':
        questions = Question.objects.filter(feedback=feedback)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
    # PUT
    elif request.method == 'PUT':
        # Checking if the feedback response has already been submitted
        if response_obj.is_submitted:
            return Response({"message": "Feedback already submitted!"}, status=400)
        
        # print(request.user)
        # user = User.objects.get(pk=request.user.pk)

        # if user.is_business:
        #     return Response({"message": "Businesses cannot submit feedbacks!"})

        # Serializing the data
        serializer = FeedbackResponseSerializer(response_obj, request.data)

        # Validating the data
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({"message": e.detail}, status=400)

        # {"feedback": 1, "response": "hi there", "is_submitted": true}

        # user.credit += 10
        # user.save()

        # TODO: If the user is bussiness, return an empty object of FeedbackResponse, with qr code filled
        # If the user is a customer, return the same object of FeedbackResponse, BUT with response filled
        # For the customer to be allowed to fill the response, the qr code must be valid (Not used yet). so just check if the response is full
        
        # Saving the data
        serializer.save()
        return Response({"message": "Feedback response svaed successfully!"})


# Getting the feedback of the FeedbackResponse based on its uuid
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedback_from_uuid(request, uuid):
    try:
        feedback = FeedbackResponse.objects.get(id=uuid).feedback
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({"message": "Invalid feedback!"}, status=400)
