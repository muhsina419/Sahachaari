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

from rest_framework import viewsets , status
from .models import *
from .serializers import TrafficReportSerializer, TrafficDataSerializer

class TrafficReportViewSet(viewsets.ModelViewSet):
    queryset = TrafficReport.objects.all().order_by('-timestamp')
    serializer_class = TrafficReportSerializer

class TrafficDataViewSet(viewsets.ModelViewSet):
    queryset = TrafficData.objects.all().order_by('-timestamp')
    serializer_class = TrafficDataSerializer

# @api_view(['GET'])
# def report_summary(request):
#     summary = TrafficReport.objects.values('report_type').annotate(total=Count('id'))
#     return Response(summary)

 

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import status
from .yolo_utils import detect_traffic_congestion  # Correct import
import os

class TrafficCongestionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        video_file = request.FILES.get("video")
        if not video_file:
            return Response({"error": "No video uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        os.makedirs("media", exist_ok=True)
        video_path = f"media/{video_file.name}"
        with open(video_path, "wb+") as destination:
            for chunk in video_file.chunks():
                destination.write(chunk)

        try:
            result = detect_traffic_congestion(video_path)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(video_path):
                os.remove(video_path)  # Clean up temp file