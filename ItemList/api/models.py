import uuid
from django.db import models


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Items(BaseModel):
    key = models.CharField(max_length=50, null=False, blank=False)
    value = models.TextField()

    def __str__(self):
        return self.key
