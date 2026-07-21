from django.urls import path
from .views import register_candidate, get_candidate, get_all_candidates

urlpatterns = [
    path('register/', register_candidate, name='register_candidate'),
    path('candidate/<int:candidate_id>/', get_candidate, name='get_candidate'),
    path('all/', get_all_candidates, name='get_all_candidates'),
]
