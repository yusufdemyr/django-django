from rest_framework import serializers
from .models import UserLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLog
        fields = '__all__'  # This will include all fields in the User model
        read_only_fields = ['id']