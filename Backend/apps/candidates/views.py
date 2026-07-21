from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import CandidateSerializer
from .models import Candidate
from django.shortcuts import get_object_or_404

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