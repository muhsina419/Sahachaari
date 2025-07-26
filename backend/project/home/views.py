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

# @api_view(['GET'])
# def report_summary(request):
#     summary = TrafficReport.objects.values('report_type').annotate(total=Count('id'))
#     return Response(summary)

 

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .yolo_utils import detect_traffic_congestion
import tempfile
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .yolo_utils import detect_traffic_congestion  # <-- import your function
from ultralytics import YOLO
from deep_sort_realtime.deepsort_tracker import DeepSort

import cv2
import torch


@method_decorator(csrf_exempt, name='dispatch')

# class TrafficCongestionAPIView(APIView):
#     parser_classes = [MultiPartParser]  # to handle file uploads
#     permission_classes=[AllowAny]
#     def post(self, request):
#         video_file = request.FILES.get('video')
#         if not video_file:
#             return Response({"error": "Video file is required."}, status=400)

#         # Save uploaded video temporarily
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
#             for chunk in video_file.chunks():
#                 tmp.write(chunk)
#             tmp_path = tmp.name

#         # Load YOLOv5 model (you can also switch to yolov5m, yolov5l, etc.)
#         model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

#         # Open video
#         cap = cv2.VideoCapture(tmp_path)
#         total_vehicles = 0
#         vehicle_classes = ['car', 'bus', 'truck', 'motorbike']

#         while cap.isOpened():
#             ret, frame = cap.read()
#             if not ret:
#                 break

#             # YOLO detection
#             results = model(frame)
#             detections = results.pandas().xyxy[0]
#             vehicles = detections[detections['name'].isin(vehicle_classes)]
#             total_vehicles += len(vehicles)

#         cap.release()

#         # Decide congestion level
#         status = "High congestion" if total_vehicles > 50 else "Normal traffic"

#         return Response({
#             "vehicles_detected": total_vehicles,
#             "status": status
#         })



class TrafficCongestionAPIView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [AllowAny]

    def post(self, request):
        video_file = request.FILES.get('video')
        if not video_file:
            return Response({"error": "Video file is required."}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            for chunk in video_file.chunks():
                tmp.write(chunk)
            tmp_path = tmp.name

        try:
            # Load YOLOv8 model
            model = YOLO("yolov8n.pt")
            tracker = DeepSort(max_age=30)

            cap = cv2.VideoCapture(tmp_path)
            tracked_ids = set()
            frame_limit = 300
            frame_counter = 0
            vehicle_classes = ["car", "bus", "truck", "motorbike"]

            while cap.isOpened() and frame_counter < frame_limit:
                ret, frame = cap.read()
                if not ret:
                    break

                results = model(frame)[0]
                detections = []

                for box in results.boxes:
                    class_id = int(box.cls[0])
                    class_name = model.names[class_id]
                    conf = float(box.conf[0])
                    if class_name in vehicle_classes and conf > 0.5:
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        detections.append(([x1, y1, x2 - x1, y2 - y1], conf, class_name))

                tracks = tracker.update_tracks(detections, frame=frame)
                for track in tracks:
                    if track.is_confirmed():
                        tracked_ids.add(track.track_id)

                frame_counter += 1

            cap.release()

            total_vehicles = len(tracked_ids)
            congestion_status = "High congestion" if total_vehicles > 50 else "Normal traffic"

            return Response({
                "vehicles_detected": total_vehicles,
                "status": congestion_status
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)
