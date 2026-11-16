"""WSGI config for warfarisk_backend project"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "warfarisk_backend.settings")

application = get_wsgi_application()
