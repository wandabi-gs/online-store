import graphene
from order.models import Order
from cart.models import Cart
from order.types import OrderType
import phonenumbers
from phonenumbers import carrier
def phone_valid(phone_number):
    try:
        parsed_number = phonenumbers.parse(phone_number, "KE")

        if phonenumbers.is_valid_number(parsed_number):
            operator = carrier.name_for_number(parsed_number, "en")

            return operator
    except phonenumbers.NumberParseException:
        pass

    return None

    
class MakeOrder(graphene.Mutation):
    order = graphene.Field(OrderType)

    def mutate(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        cart, created = Cart.objects.get_or_create(user=user)
        if not created:
            order = Order.objects.create(user=user)
            for product in cart.products:
                order.products.add(product)
            
            cart.products.clear()
                        
            return MakeOrder(order=order)
        
        return None
    
class CancelOrder(graphene.Mutation):
    order = graphene.Field(OrderType)

    class Arguments:
        order_uid = graphene.UUID(required=True)

    def mutate(self, info, order_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')
        
        order = Order.objects.get(user=user, uid=order_uid)
        order.status = "canceled"

        return order
    
class OrderMutation(graphene.ObjectType):
    make_order = MakeOrder.Field()
    cancel_order = CancelOrder.Field()
    