from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import CandidateSerializer
from .models import Candidate
import json
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password


@api_view(['POST'])
def register_candidate(request):
    serializer = CandidateSerializer(data=request.data)
    if serializer.is_valid():
        candidate = serializer.save()
        return Response({
            'message': 'Registration successful!',
            'data': serializer.data,
            'candidate_id': candidate.id
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_candidate(request, candidate_id):
    candidate = get_object_or_404(Candidate, id=candidate_id)
    serializer = CandidateSerializer(candidate)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_candidates(request):
    candidates = Candidate.objects.all()
    serializer = CandidateSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@csrf_exempt
def login_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"detail": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        candidate = Candidate.objects.get(email=email)
    except Candidate.DoesNotExist:
        return Response(
            {"detail": "Invalid email or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Check hashed password correctly
    if not check_password(password, candidate.password):
        return Response(
            {"detail": "Invalid email or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response({
        "message": "Login successful",
        "candidate_id": candidate.id,
        "full_name": candidate.full_name,
        "email": candidate.email,
        "course": candidate.course
    }, status=status.HTTP_200_OK)