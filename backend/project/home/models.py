from django.db import models

# Create your models here.

class TrafficReport(models.Model):
    location = models.CharField(max_length=255)
    report_type = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class TrafficData(models.Model):
    location = models.CharField(max_length=255)
    avg_speed = models.FloatField()
    congestion_level = models.CharField(max_length=20)
    timestamp = models.DateTimeField()