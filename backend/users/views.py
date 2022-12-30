from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer, UserFullSerializer

# ----------------- USER ----------------- #

# Getting the user's information
@api_view(['GET', 'PUT'])
def get_user(request, pk):
    user = CustomUser.objects.get(pk=pk)

    # GET
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    # PUT
    elif request.method == 'PUT':
        serializer = UserSerializer(user, request.data , partial=True)

        if serializer.is_valid():
            # Adding the credit to the user
            try:
                serializer.validated_data['credit'] += user.credit
            except:
                pass

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


# Creating a new user
@api_view(['POST'])
def create_user(request):
    serializer = UserFullSerializer(data=request.data, partial=True)

    if serializer.is_valid():
        # print(serializer.validated_data)
        # CustomUser.objects.create_user(**serializer.validated_data)
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

