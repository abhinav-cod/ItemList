import json
from django.core.management.base import BaseCommand
from ItemList.api.models import Items


class Command(BaseCommand):
    help = 'Load items from a JSON file into the database'

    def handle(self, *args, **kwargs):
        with open('data.json') as file:
            items_data = json.load(file)
            for item in items_data:
                Items.objects.create(key=item['key'], value=item['value'])
        self.stdout.write(self.style.SUCCESS('Successfully loaded items'))
