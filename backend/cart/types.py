import graphene
from graphene_django.types import DjangoObjectType
from cart.models import Cart, WishList

class QuantityType(graphene.ObjectType):
    product = graphene.Field('product.types.ProductType')
    quantity = graphene.Int()
    created_at = graphene.DateTime()
    product_total = graphene.Int()

class CartType(DjangoObjectType):
    qproducts = graphene.List(QuantityType)
    grant_total = graphene.Int()

    class Meta:
        model = Cart


    def resolve_qproducts(self, info):
        qproducts= []

        for cart_product in self.cartproduct_set.all():
            quantity_type = QuantityType(product=cart_product.product, quantity=cart_product.quantity, created_at=cart_product.created_at, product_total=cart_product.product.price * cart_product.quantity)
            qproducts.append(quantity_type)

        return qproducts
    
    def resolve_grant_total(self, info):
        total = 10

        for cart_product in self.cartproduct_set.all():
            total += cart_product.product.price * cart_product.quantity

        return total


class WishListType(DjangoObjectType):
    class Meta:
        model = WishList
