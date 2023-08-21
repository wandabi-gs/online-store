from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
from product.models import Product

User = get_user_model()

class Cart(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    products = models.ManyToManyField(to=Product, through='CartProduct')

    def add_product(self, product_uid):
        product = Product.objects.get(uid=product_uid)
        
        cart_product, created = CartProduct.objects.get_or_create(cart=self, product=product)
        if not created:
            if cart_product.quantity < 3:
                cart_product.quantity += 1
                cart_product.save()

    def reduce_product(self, product_uid):
        product = Product.objects.get(uid=product_uid)
        
        try:
            cart_product = CartProduct.objects.get(cart=self, product=product)
            
            if cart_product.quantity > 1:
                cart_product.quantity -= 1
                cart_product.save()
        
        except CartProduct.DoesNotExist:
            pass

    def checkout(self):
        self.products.clear()

    def remove_product(self, product_uid):
        product = Product.objects.get(uid=product_uid)
        self.products.remove(product)


class CartProduct(models.Model):
    cart = models.ForeignKey(to=Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)


class WishList(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    products = models.ManyToManyField(to=Product, through='WishProduct')

    def checkout(self):
        self.products.clear()

    def reduce_product(self, product_uid):
        product = Product.objects.get(uid=product_uid)
        self.products.remove(product)

    def add_product(self, product_uid):
        product = Product.objects.get(uid=product_uid)
        self.products.add(product)



class WishProduct(models.Model):
    wishlist = models.ForeignKey(to=WishList, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)