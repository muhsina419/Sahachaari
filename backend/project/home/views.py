# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from .models import User
# from .serializers import UserSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import AllowAny


# class UserApi(APIView):
#     permission_classes=[AllowAny]
#     # GET all users
#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     # POST: create a new user
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # PUT: update a user (expects 'id' in request.data)
#     def put(self, request):
#         user_id = request.data.get('id')
#         user = get_object_or_404(User, id=user_id)
#         serializer = UserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # DELETE: delete a user (expects 'id' in request.data)
#     def delete(self, request):
#         user_id = request.data.get('id')
#         user = get_object_or_404(User, id=user_id)
#         user.delete()
#         return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

from rest_framework import viewsets
from .models import *
from .serializers import TrafficReportSerializer, TrafficDataSerializer

class TrafficReportViewSet(viewsets.ModelViewSet):
    queryset = TrafficReport.objects.all().order_by('-timestamp')
    serializer_class = TrafficReportSerializer

class TrafficDataViewSet(viewsets.ModelViewSet):
    queryset = TrafficData.objects.all().order_by('-timestamp')
    serializer_class = TrafficDataSerializer
