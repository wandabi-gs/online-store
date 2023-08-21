from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
from product.models import Product, Vendor

User = get_user_model()


status = [
    ["pending payment","pending payment"],
    ["paid","paid"],
    ["shipped","shipped"],
    ["arrived","arrived"],
    ["signed","signed"],
    ["pending review","pending review"],
    ["canceled","canceled"]
]


class Order(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4)
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    products = models.ManyToManyField(to=Product, through='OrderProduct')
    status = models.CharField(max_length=20, choices=status, default="pending payment")
    created_at = models.DateTimeField(auto_now_add=True)


class OrderProduct(models.Model):
    order = models.ForeignKey(to=Order, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    discount = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)


class Voucher(models.Model):
    uid = models.UUIDField(unique=True, default=uuid4)
    vendor = models.ForeignKey(to=Vendor, to_field='uid', on_delete=models.CASCADE)
    minimum = models.IntegerField(default=0)
    maximum = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

# class PickUpStation(models.Model):
#     uid = models.UUIDField(default=uuid4, unique=True)

