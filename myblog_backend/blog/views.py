from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Article, Tag
from .serializers import RegisterSerializer, UserSerializer, ArticleSerializer, TagSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

# Tags: list/create
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# Articles
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('author').prefetch_related('tags').all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if self.action == 'list':
            if user.is_authenticated:
                return qs.filter(author=user)
            else:
                return qs.filter(status=Article.PUBLISHED)
        if self.action in ('retrieve',):
            if not user.is_authenticated:
                return qs.filter(status=Article.PUBLISHED)
        return qs

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer