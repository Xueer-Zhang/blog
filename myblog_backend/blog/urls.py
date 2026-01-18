from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ArticleViewSet, TagViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'tags', TagViewSet, basename='tag')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]