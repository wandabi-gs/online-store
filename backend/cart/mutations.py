import graphene
from cart.models import Cart, WishList
from cart.types import CartType, WishListType

class AddProductToCart(graphene.Mutation):
    cart = graphene.Field(CartType)

    class Arguments:
        product_uid = graphene.UUID(required=True)

    def mutate(self, info, product_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        cart, created = Cart.objects.get_or_create(user=user)
        cart.add_product(product_uid)
        
        return AddProductToCart(cart=cart)

class ReduceProductInCart(graphene.Mutation):
    cart = graphene.Field(CartType)

    class Arguments:
        product_uid = graphene.UUID(required=True)

    def mutate(self, info, product_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        cart, created = Cart.objects.get_or_create(user=user)
        cart.reduce_product(product_uid)
        
        return ReduceProductInCart(cart=cart)
    
class RemoveCartProduct(graphene.Mutation):
    cart = graphene.Field(CartType)

    class Arguments:
        product_uid = graphene.UUID(required=True)

    def mutate(self, info, product_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required")
        
        cart = Cart.objects.get(user=user)
        cart.remove_product(product_uid=product_uid)

        return RemoveCartProduct(cart=cart)
    
class ReduceProductInWishList(graphene.Mutation):
    wishlist = graphene.Field(WishListType)

    class Arguments:
        product_uid = graphene.UUID(required=True)

    def mutate(self, info, product_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        wishlist, created = WishList.objects.get_or_create(user=user)
        wishlist.reduce_product(product_uid)
        
        return ReduceProductInCart(wishlist=wishlist)

class CheckoutCart(graphene.Mutation):
    cart = graphene.Field(CartType)

    def mutate(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        cart, created = Cart.objects.get_or_create(user=user)
        cart.checkout()

        return CheckoutCart(cart=cart)
    
class AddProductToWishList(graphene.Mutation):
    wishlist = graphene.Field(WishListType)

    class Arguments:
        product_uid = graphene.UUID(required=True)

    def mutate(self, info, product_uid):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        wishlist, created = WishList.objects.get_or_create(user=user)
        wishlist.add_product(product_uid)
    
        return AddProductToWishList(wishlist=wishlist)

class CheckoutWishList(graphene.Mutation):
    wishlist = graphene.Field(WishListType)

    def mutate(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication required.')

        wishlist, created = WishList.objects.get_or_create(user=user)
        wishlist.checkout()

        return CheckoutWishList(wishlist=wishlist)

class CartMutation(graphene.ObjectType):
    add_cart = AddProductToCart.Field()
    reduce_cart = ReduceProductInCart.Field()
    remove_cart = RemoveCartProduct.Field()
    checkout_cart = CheckoutCart.Field()
    add_wishlist = AddProductToWishList.Field()
    reduce_wishlist = ReduceProductInWishList.Field()
    checkout_wishlist = CheckoutWishList.Field()
