from django.db import models
from uuid import uuid4
from django.contrib.auth import get_user_model
from django.db.models import Avg


User = get_user_model()


class Vendor(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
    

class Category(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
    

class Product(models.Model):
    uid = models.UUIDField(default=uuid4, unique=True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    discount = models.IntegerField(default=0)
    total_product = models.IntegerField(default=0)
    product_sold = models.IntegerField(default=0)
    vendor = models.ForeignKey(to=Vendor, to_field='uid', on_delete=models.CASCADE)
    category = models.ForeignKey(to=Category, to_field='uid', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
    
    def avg_rating(self):
        average_rating = Review.objects.filter(product=self).aggregate(Avg('rating'))['rating__avg']
        average_rating = int(average_rating) if average_rating is not None else 0
        return average_rating
    

class ProductImage(models.Model):
    product = models.ForeignKey(to=Product, to_field='uid', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product/")

ratings = (
    (0,0),(1,1),(2,2),(3,3),(4,4),(5,5)
)

class Review(models.Model):
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, to_field='uid', on_delete=models.CASCADE, null=True)
    rating = models.IntegerField(default=5,choices=ratings)
    review = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.user.email
    
    
class Like(models.Model):
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, to_field='uid', on_delete=models.CASCADE, null=True)
    

class Recommendation(models.Model):
    user = models.ForeignKey(to=User, to_field='uid', on_delete=models.CASCADE)
    vendors = models.ManyToManyField(to=Vendor)
    categories = models.ManyToManyField(to=Category)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.user.name

    class Meta:
        ordering = ("created_at",)