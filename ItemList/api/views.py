from rest_framework import viewsets
from .models import Items
from .serializers import ItemsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class ItemsViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
