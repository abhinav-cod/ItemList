from django.contrib import admin
from .models import Items


@admin.register(Items)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'key', 'value', 'created_at', 'updated_at')
    search_fields = ('key', 'value')