from django.db import models

class Candidate(models.Model):
    COURSE_CHOICES = [
        ('web_development', 'Web Development'),
        ('python_programming', 'Python Programming'),
        ('data_science', 'Data Science'),
        ('machine_learning', 'Machine Learning'),
    ]
    
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    course = models.CharField(max_length=50, choices=COURSE_CHOICES)
    cv = models.FileField(upload_to='cvs/', blank=True, null=True)
    profile_photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.full_name} - {self.email}"
