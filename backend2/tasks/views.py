from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
import openpyxl
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.request.query_params.get('username')  
        if username:
            queryset = queryset.filter(username=username)
        return queryset

    @action(detail=False, methods=['get'])
    def export(self, request):
        username = request.query_params.get('username')  
        tasks = Task.objects.all()

        if username:
            tasks = tasks.filter(username=username)

        
        workbook = openpyxl.Workbook()
        sheet = workbook.active
        sheet.title = "Tasks"

    
        sheet.append(["ID", "Title", "Description", "Effort (Days)", "Due Date", "Username"])

        for task in tasks:
            sheet.append([
                task.id,
                task.title,
                task.description,
                task.effort,
                task.due_date.strftime('%Y-%m-%d'),
                task.username
            ])

        
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename=tasks.xlsx'
        workbook.save(response)
        return response
