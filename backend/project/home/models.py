from django.db import models

# Create your models here.


class User (models.Model):
    name=models.CharField(max_length=100,null=True,blank=True)
    place=models.CharField(max_length=100,null=True,blank=True)
    age=models.IntegerField(null=True,blank=True)