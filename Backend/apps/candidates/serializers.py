from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Candidate

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'course',
            'password',
            'cv',
            'profile_photo',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Candidate.objects.create(**validated_data)