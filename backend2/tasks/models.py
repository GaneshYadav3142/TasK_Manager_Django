from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    effort = models.IntegerField()
    due_date = models.DateField()
    username = models.CharField(max_length=150) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
