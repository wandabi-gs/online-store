import graphene
from order.types import OrderType
from order.models import Order

class OrderQuery(graphene.ObjectType):
    orders = graphene.List(OrderType)
    order_by_id = graphene.Field(OrderType, order_uid=graphene.UUID())

    def resolve_orders(self, info):
        return Order.objects.filter(user=info.context.user)
    
    def resolve_order_by_id(self, info, order_uid):
        return Order.objects.filter(user=info.context.user, uid=order_uid)