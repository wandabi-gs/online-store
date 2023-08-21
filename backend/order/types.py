from order.models import Order
from graphene_django.types import DjangoObjectType

class OrderType(DjangoObjectType):
    class Meta:
        model = Order