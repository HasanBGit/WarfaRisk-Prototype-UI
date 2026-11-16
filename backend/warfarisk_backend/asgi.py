"""ASGI config for warfarisk_backend project"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "warfarisk_backend.settings")

application = get_asgi_application()
