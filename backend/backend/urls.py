from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)