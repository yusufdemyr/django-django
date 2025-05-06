from django.urls import path
from .views import home,register_log
import os
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home, name='home'),
    path('regLog/', register_log, name='create_log_info'),
    # Add more URL patterns here as needed
]
if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=os.path.join(settings.BASE_DIR, 'apps', 'frontend', 'static')
    )
