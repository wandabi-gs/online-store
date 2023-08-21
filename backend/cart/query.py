import graphene
from cart.types import CartType, WishListType
from cart.models import Cart, WishList

class CartQuery(graphene.ObjectType):
    cart = graphene.Field(CartType)
    wishlist = graphene.Field(WishListType)

    def resolve_cart(self, info):
        user = info.context.user
        if user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=user)
            return cart
        
        return None

    def resolve_wishlist(self, info):
        user = info.context.user
        if user.is_authenticated:
            wishlist, created = WishList.objects.get_or_create(user=user)

            return wishlist
        
        return None