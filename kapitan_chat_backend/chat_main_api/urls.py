from rest_framework.routers import DefaultRouter

from .views import ChatView, AttachmentView, MessageView

router = DefaultRouter()
router.register(r'attachment', AttachmentView, basename='attachment')
router.register(r'message', MessageView, basename='message')
router.register(r'', ChatView, basename='chat')

urlpatterns = router.urls