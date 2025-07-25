from rest_framework import serializers
from .models import *

class TrafficReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrafficReport
        fields = '__all__'

class TrafficDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrafficData
        fields = '__all__'