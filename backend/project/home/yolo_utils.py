# from ultralytics import YOLO
# import cv2
# from deep_sort_realtime.deepsort_tracker import DeepSort
# import numpy as np

# # Load YOLOv8 model
# model = YOLO("yolov8n.pt")

# # Initialize DeepSort
# tracker = DeepSort(max_age=30)

# # Vehicle classes to track
# vehicle_classes = ["car", "bus", "truck", "motorbike"]

# def detect_traffic_congestion(video_path="backend/project/WhatsApp Video 2025-07-26 at 06.35.59_7311e790.mp4", frame_limit=500):
#     cap = cv2.VideoCapture(video_path)
#     congestion_count = 0
#     tracked_ids = set()
#     frame_counter = 0

#     while cap.isOpened() and frame_counter < frame_limit:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Run YOLOv8 detection
#         results = model(frame)[0]
#         detections = []

#         for box in results.boxes:
#             class_id = int(box.cls[0])
#             class_name = model.names[class_id]
#             conf = float(box.conf[0])
#             if class_name in vehicle_classes and conf > 0.5:
#                 x1, y1, x2, y2 = map(int, box.xyxy[0])
#                 detections.append(([x1, y1, x2 - x1, y2 - y1], conf, class_name))

#         # DeepSort expects: [ [x, y, w, h], confidence, class ]
#         tracks = tracker.update_tracks(detections, frame=frame)

#         # Count unique vehicle IDs
#         for track in tracks:
#             if not track.is_confirmed():
#                 continue
#             track_id = track.track_id
#             tracked_ids.add(track_id)

#         frame_counter += 1

#     cap.release()

#     total_vehicles = len(tracked_ids)
#     congestion_level = "High" if total_vehicles > 40 else "Medium" if total_vehicles > 20 else "Low"

#     return {
#     "vehicles_detected": count,
#     "status": "High congestion" if count > 50 else "Normal traffic"
# }
#yolo_util.py
from ultralytics import YOLO
import cv2
from deep_sort_realtime.deepsort_tracker import DeepSort
import numpy as np

# Load YOLOv8 model once
model = YOLO("yolov8n.pt")
tracker = DeepSort(max_age=30)
vehicle_classes = ["car", "bus", "truck", "motorbike"]

def detect_traffic_congestion(video_path, frame_limit=500):
    cap = cv2.VideoCapture(video_path)
    tracked_ids = set()
    frame_counter = 0

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
            if not track.is_confirmed():
                continue
            tracked_ids.add(track.track_id)

        frame_counter += 1

    cap.release()
    total_vehicles = len(tracked_ids)
    return {
        "vehicles_detected": total_vehicles,
        "status": "High congestion" if total_vehicles > 50 else "Normal traffic"
    }

# Example usage:
if __name__ == "__main__":
    video_path = "backend/project/WhatsApp Video 2025-07-26 at 06.35.59_7311e790.mp4"
    result = detect_traffic_congestion(video_path)
    print(result)