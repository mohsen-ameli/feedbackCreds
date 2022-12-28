from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer

# ----------------- USER ----------------- #

# Getting the user's information
@api_view(['GET'])
def get_user(request, pk):
    user = CustomUser.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)