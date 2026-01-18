from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Tag
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Article
        fields = ('id','title','content','author','status','created_at','updated_at','published_at','tags')

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        article = Article.objects.create(**validated_data)
        self._handle_tags(article, tags_data)
        return article

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        # set published_at if switching to published and published_at empty
        if instance.status == Article.PUBLISHED and instance.published_at is None:
            instance.published_at = timezone.now()
        instance.save()
        if tags_data is not None:
            instance.tags.clear()
            self._handle_tags(instance, tags_data)
        return instance

    def _handle_tags(self, article, tags_data):
        for tag in tags_data:
            name = tag.get('name')
            if not name:
                continue
            tag_obj, _ = Tag.objects.get_or_create(name=name)
            article.tags.add(tag_obj)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['id'] = self.user.id
        return data